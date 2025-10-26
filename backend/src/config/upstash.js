import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create Redis connection
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a rate limiter that allows 10 requests per 20 seconds
const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "20 s"),
  prefix: "ratelimit",
});

export default rateLimiter;
