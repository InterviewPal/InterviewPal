import {RedisService} from "@/lib/server/services/redis.service";
import {OpenAIStreamService} from "@/lib/server/services/openAIStream.service";
import {UserRepository} from "@/lib/server/repositories/user.repository";
import {AssessAllInterviewQuestionsPayload, InterviewQuestionSubmissionPayload} from "@/lib/shared/dtos";
import {InterviewQuestion} from "@/lib/shared/models/interview.models";
import str from 'string-to-stream';
import {InterviewRepository} from "@/lib/server/repositories/interview.repository";

type questionType = "introductory" | "technical";

// name, type of interview,

const systemContent = `You are an interview coach doing a mock interview. Try to give feedback for your interviewees responses. 

Respond in a JSON format with objects:
 "pros" which is a single sentence that contains brief and concise positive feedback.
"cons" which is an array that contains point-form criticisms. provide two to four points, depending on how bad the response was.
"grade" which is an int representing an overall grade out of 100. be critical, but still objective with the grade.
"overall" which represents a summary of the feedback.

{
    "pros": "",
    "cons": [],
    "grade": 0,
    "overall": ""
}

Your response should ONLY BE THE JSON FILE.`;


export const InterviewService = {

    async assessInterviewQuestion(payload: InterviewQuestionSubmissionPayload) {
        // send a request to the OpenAI API and get a response back (stream)
        const stream = await OpenAIStreamService.getCompletionStream({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemContent },
                { role: "user", content: `
                I'm doing an interview and I was asked this question:
"${payload.question}"
My answer was:
"${payload.userAnswerContent}"
Please grade my answer and give me feedback. Do not provide a summary paragraph and respond in pure JSON parsable.` }
            ],
            temperature: 0.6,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 500,
            stream: true,
            n: 1,
        });

        // store the response in Redis
        const answer = await this.saveQuestionToRedis({ stream, ...payload })

        // return str(answer);
        return answer;
    },

    async assessAllInterviewQuestions(payload: AssessAllInterviewQuestionsPayload) {
        // get the questions from Redis
        const questions = await UserRepository.getInterviewResultsByInterviewUUID(payload);

        // send a request to the OpenAI API and get a response back (stream)
        let content = '';
        questions.forEach(({question, userAnswer}, i) => {
            content = content + `
            Question ${i + 1}:
            "${question}"
            Interviewee's answer:
            "${userAnswer}"
            
            `
        });

        console.log("content: ", content)

        const stream = await OpenAIStreamService.getCompletionStream({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemContent },
                { role: "user", content: `
                I had an interview and These are my answers to the questions:
                ${content}
                
Please grade my answer and give me feedback. Do not provide a summary paragraph and respond in pure JSON parsable by JSON.parse in JavaScript.` }
            ],
            temperature: 0.6,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 1000,
            stream: true,
            n: 1,
        });

        console.log("stream: ", stream)

        const interview = await InterviewRepository.getInterviewById(payload.interviewUUID);
        if (!interview) throw new Error("Interview not found");

        interview.isDone = "true";

        InterviewRepository.saveInterview(interview)

        return stream;
    },

    async saveQuestionToRedis({ stream, ...payload }: { stream: ReadableStream } & InterviewQuestionSubmissionPayload) {
        const reader = stream.getReader();

        const decoder = new TextDecoder();
        let done = false;

        let answer = "";
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            answer = answer + chunkValue;
        }

        console.log("answer: ", answer);

        const result: InterviewQuestion = {
            userId: payload.tmpUserUUID,
            interviewId: payload.interviewUUID,
            question: payload.question,
            userAnswer: payload.userAnswerContent,
            systemAnswer: answer,
        };

        const redisKey = `user:${payload.tmpUserUUID}:interviewId:${payload.interviewUUID}:${payload.promptNumber}`;
        const redisSuccess = await RedisService.redis.hmset(redisKey, result);
        if (redisSuccess !== "OK") {
            await RedisService.redis.expire(redisKey, 60 * 60)
            console.error("Failed to save to Redis ⚠️");
        }
        return answer;
    }
};
