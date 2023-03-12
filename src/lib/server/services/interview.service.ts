import {RedisService} from "@/lib/server/services/redis.service";
import {OpenAIStreamService} from "@/lib/server/services/openAIStream.service";
import {InterviewRepository} from "@/lib/server/repositories/interview.repository";
import {UserRepository} from "@/lib/server/repositories/user.repository";
import {AssessAllInterviewQuestionsPayload, InterviewQuestionSubmissionPayload} from "@/lib/shared/dtos";
import {InterviewQuestion} from "@/lib/shared/models/interviewQuestion.model";

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
Please grade my answer and give me feedback. Do not provide a summary paragraph and respond in pure JSON.` }
            ],
            temperature: 0.6,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 250,
            stream: true,
            n: 1,
        });

        // store the response in Redis
        this.saveQuestionToRedis({ stream, ...payload })
            .then((result) => {
                if (result) {
                    console.log("Successfully saved to Redis");
                } else {
                    console.log("Failed to save to Redis ⚠️");
                }
            }).catch(console.error);

        return stream;
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

        const stream = await OpenAIStreamService.getCompletionStream({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemContent },
                { role: "user", content: `
                I had an interview and These are my answers to the questions:
                ${content}
                
Please grade my answer and give me feedback. Do not provide a summary paragraph and respond in pure JSON.` }
            ],
            temperature: 0.6,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 1000,
            stream: true,
            n: 1,
        });

        return stream;
    },

    async saveQuestionToRedis({ stream, ...payload }: { stream: ReadableStream<any> } & InterviewQuestionSubmissionPayload) {
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

        return RedisService.redis.hmset(`user:${payload.tmpUserUUID}:interviewId:${payload.interviewUUID}:${payload.promptNumber}`, result);
    }
};