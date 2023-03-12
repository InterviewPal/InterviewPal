import {RedisService} from "@/lib/services/redis.service";
import {InterviewQuestion} from "@/lib/models/interviewQuestion.model";

export const UserRepository = {
    async getInterviewResultsByInterviewUUID({tmpUserUUID, interviewUUID}:{tmpUserUUID: string, interviewUUID: string}): Promise<InterviewQuestion[]> {
        const questions: InterviewQuestion[] = [];
        let currentPromptNumber = 1;
        while (true) {
            const question = await RedisService.redis.hgetall(`user:${tmpUserUUID}:interviewId:${interviewUUID}:${currentPromptNumber}`);
            if (Object.keys(question).length > 0) {
                questions.push(question as unknown as InterviewQuestion);
            } else {
                break;
            }
            currentPromptNumber++;
        }
        return questions;
    },
};
