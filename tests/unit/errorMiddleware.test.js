const logger = require("../../utils/logger");

const errorHandler = (err, req, res, next) => {
    const requestId = req.requestId;

    // Joi validation error
    if (err.isJoi) {
        logger.error("Request failed", {
            requestId,
            method: req.method,
            url: req.originalUrl,
            statusCode: 400
        });

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.details.map(detail => ({
                field: detail.path.join("."),
                message: detail.message
            })),
            requestId
        });
    }

    const statusCode = err.statusCode || 500;

    logger.error("Request failed", {
        requestId,
        method: req.method,
        url: req.originalUrl,
        statusCode
    });

    return res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500
                ? "Internal server error"
                : err.message,
        requestId
    });
};

module.exports = errorHandler;