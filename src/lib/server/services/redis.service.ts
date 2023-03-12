import Redis from "ioredis";

export const RedisService = {
    redis: new Redis(process.env.REDIS_URL ?? ""),

};

if (process.env.REDIS_URL === undefined) {
    console.error("⚠️ REDIS_URL is not defined in env!");
}
