const crypto = require("crypto");

const logger = require("../../utils/logger");

const requestLogger = (req, res, next) => {
    const requestId = crypto.randomUUID();
    req.requestId = requestId;

    const startTime = Date.now();

    logger.info("Incoming request",{
        requestId,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
    });

    res.on("finish", () => {
        const duration = Date.now() - startTime;
        logger.info("Request completed",{
            requestId,
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
        });
    });
    next();
   
};

module.exports = requestLogger;