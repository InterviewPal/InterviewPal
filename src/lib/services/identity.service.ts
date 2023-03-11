import { v4 } from "uuid";
import {RedisService} from "@/lib/services/redis.service";

interface TmpUser {
    uuid: string;
    name: string;
}

export const IdentityService = {
    async createNewIdentity() {
        const uuid = v4();
        const success = await RedisService.redis.set(`tmpUser:${uuid}`, JSON.stringify({
            uuid,
            name: "Anonymous",
        } satisfies TmpUser));
        if (success) {
            return uuid;
        }
        return null;
    },

    async getIdentity({ uuid }: { uuid: string }) {
        const tmpUser = await RedisService.redis.get(`tmpUser:${uuid}`);
        if (tmpUser) {
            return JSON.parse(tmpUser);
        }
        return null;
    },
};
