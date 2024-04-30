import rateLimiter from "express-rate-limit"

const limiter = rateLimiter({
    windowMs: 15 * 60 * 100,
    limit: 100,
    message: "Too many requests from this IP, please try again later."
});

export default limiter;