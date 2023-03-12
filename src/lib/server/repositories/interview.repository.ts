import {RedisService} from "@/lib/server/services/redis.service";
import {v4} from "uuid";
import {Interview} from "@/lib/shared/models/interview.model";
import {CreateInterviewPayload} from "@/lib/shared/dtos/createInterview.payload";

export const InterviewRepository = {
    async createInterview(payload: CreateInterviewPayload) {
        const interview: Interview = {
            uuid: v4(),
            userUUID: payload.userId!,
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
        if (Object.keys(interview).length > 0) {
            return interview as unknown as Interview;
        }
        return null;
    },
};
