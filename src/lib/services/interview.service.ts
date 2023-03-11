import {RedisService} from "@/lib/services/redis.service";
import {OpenAIStreamService} from "@/lib/services/openAIStream.service";

type questionType = "introductory" | "technical";

// name, type of interview,

export const InterviewService = {

    async assessInterviewQuestion({ tmpUserUUID, promptNumber, question, userAnswerContent }: { tmpUserUUID: string, promptNumber: number, question: string, userAnswerContent: string }) {
        // send a request to the OpenAI API and get a response back (stream)
        const stream = await OpenAIStreamService.getCompletionStream({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant that gives feedback about interviewees answers to interview questions for a job as a software engineer." },
                { role: "user", content: `
                Assess and rate this interviewee answer to this question: "${question}"
                interviewee: "${userAnswerContent}"` }
            ],
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 100,
            stream: true,
            n: 1,
        });

        // store the response in Redis (key: [uuid:<number of question (int)>], value: hashset -> {question: <question>, userAnswer: <userAnswer>})
        // i.e key: uuid:1 ; value:  {question: "What is your name?", userAnswer: "My name is John"}

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
            question,
            userAnswer: userAnswerContent,
            systemAnswer: answer,
        };

        const success = await RedisService.redis.hmset(`${tmpUserUUID}:${promptNumber}`, result);
        if (success) {
            return result;
        }
        return null;
    },
};
