import {RedisService} from "@/lib/services/redis.service";
import {OpenAIStreamService} from "@/lib/services/openAIStream.service";

type questionType = "introductory" | "technical";

// name, type of interview,

interface InterviewQuestionPayload {
    tmpUserUUID: string;
    interviewUUID: string;
    promptNumber: number;
    question: string;
    userAnswerContent: string;
}

interface InterviewQuestionsPayload {
    totalQuestions: number;
    tmpUserUUID: string;
    interviewUUID: string;
}

export const InterviewService = {

    async assessInterviewQuestion(payload: InterviewQuestionPayload) {
        // send a request to the OpenAI API and get a response back (stream)
        const stream = await OpenAIStreamService.getCompletionStream({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant that gives feedback about interviewees answers to interview questions for a job as a software engineer." },
                { role: "user", content: `
                Assess and rate this interviewee answer to this question: "${payload.question}"
                interviewee: "${payload.userAnswerContent}"` }
            ],
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 100,
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

    async assessAllInterviewQuestions(payload: InterviewQuestionsPayload) {
        // get the questions from Redis
        const questions = [];
        for (let i = 1; i <= payload.totalQuestions; i++) {
            const question = await RedisService.redis.hgetall(`user:${payload.tmpUserUUID}:interviewId:${payload.interviewUUID}:${i}`);
            questions.push(question);
        }

        // TODO: send a request to the OpenAI API and get a response back (stream)
    },

    async saveQuestionToRedis({ stream, ...payload }: { stream: ReadableStream<any> } & InterviewQuestionPayload) {
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

        const result = {
            userId: payload.tmpUserUUID,
            interviewId: payload.interviewUUID,
            question: payload.question,
            userAnswer: payload.userAnswerContent,
            systemAnswer: answer,
        };

        return RedisService.redis.hmset(`user:${payload.tmpUserUUID}:interviewId:${payload.interviewUUID}:${payload.promptNumber}`, result);
    }
};
