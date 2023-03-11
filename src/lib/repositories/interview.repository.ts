import {RedisService} from "@/lib/services/redis.service";
import {v4} from "uuid";

export interface Interview {
    uuid: string;
    userUUID: string;
    createdAt: Date;
}

export const InterviewRepository = {
    async createInterview(userUUID: string) {
        const interview: Interview = {
            uuid: v4(),
            userUUID,
            createdAt: new Date(),
        }
        const success = await RedisService.redis.hmset(`interview:${interview.uuid}`, interview);
        if (success) {
            return interview;
        }
        return null;
    },

    async getInterviewById(uuid: string) {
        const interview = await RedisService.redis.hgetall(`interview:${uuid}`);
        if (interview) {
            return interview as unknown as Interview;
        }
        return null;
    },
};
