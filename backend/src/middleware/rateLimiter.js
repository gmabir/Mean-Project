import rateLimiter from "../config/upstash.js";

const rateLimitMiddleware = async (req, res, next) => {
  try {
    //Par userer rate limited
    const { success } = await rateLimiter.limit(userid);

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(error);
  }
};

export default rateLimitMiddleware;
