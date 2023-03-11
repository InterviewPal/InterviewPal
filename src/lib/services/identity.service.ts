import { v4 } from "uuid";
import {RedisService} from "@/lib/services/redis.service";
import {NextApiRequest, NextApiResponse} from "next";

interface TmpUser {
    uuid: string;
    name: string;
}

export const IdentityService = {
    async createNewIdentity() {
        const uuid = v4();
        const success = await RedisService.redis.hmset(`tmpUser:${uuid}`, {
            uuid,
            name: "Anonymous",
        } satisfies TmpUser);
        if (success) {
            return uuid;
        }
        return null;
    },

    async getIdentity({ uuid }: { uuid: string }) {
        const tmpUser = await RedisService.redis.hgetall(`tmpUser:${uuid}`);
        if (Object.keys(tmpUser).length > 0) {
            return tmpUser as unknown as TmpUser;
        }
        return null;
    },

    async authorizeSession(req: NextApiRequest) {
        // get the auth token from the request bearer header
        const tokenUUID = req.headers.authorization?.split(" ")[1] ?? "";
        if (tokenUUID === "") {
            // if the token is not present, return 401
            return null;
        }

        const user = await IdentityService.getIdentity({ uuid: tokenUUID });
        if (user) {
            return user;
        } else {
            // if the token is not valid, return 401
            return null;
        }
    },
};
