import {RedisService} from "@/lib/server/services/redis.service";
import {v4} from "uuid";
import {CreateInterviewPayload} from "@/lib/shared/dtos/createInterview.payload";
import {Interview} from "@/lib/shared/models/interview.models";

export const InterviewRepository = {
    async createInterview(payload: CreateInterviewPayload) {
        const interview: Interview = {
            uuid: v4(),
            type: payload.type,
            userUUID: payload.userId!,
            createdAt: new Date(),
            isDone: "false",
        }
        const success = await RedisService.redis.hmset(`interview:${interview.uuid}`, interview);
        if (success) {
            await RedisService.redis.expire(`interview:${interview.uuid}`, 60 * 60)
            return interview;
        }
        return null;
    },

    async getInterviewById(uuid: string) {
        const interview = await RedisService.redis.hgetall(`interview:${uuid}`);
        if (Object.keys(interview).length > 0) {
            return interview as unknown as Interview;
        }
        return null;
    },

    async saveInterview(interview: Interview) {
        const success = await RedisService.redis.hmset(`interview:${interview.uuid}`, interview);
        if (success) {
            await RedisService.redis.expire(`interview:${interview.uuid}`, 60 * 60)
            return interview;
        }
        return null;
    }
};
