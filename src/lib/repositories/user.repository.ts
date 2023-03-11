import {RedisService} from "@/lib/services/redis.service";

export const UserRepository = {
    async getInterviewResultsByInterviewUUID({tmpUserUUID, interviewUUID}:{tmpUserUUID: string, interviewUUID: string}) {
        const questions = [];
        let currentPromptNumber = 1;
        while (true) {
            const question = await RedisService.redis.hgetall(`user:${tmpUserUUID}:interviewId:${interviewUUID}:${currentPromptNumber}`);
            if (Object.keys(question).length > 0) {
                questions.push(question);
            } else {
                break;
            }
            currentPromptNumber++;
        }
        return questions;
    },
};
