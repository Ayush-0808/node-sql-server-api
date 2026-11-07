const logger = require("../../utils/logger");

const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;

   logger.error("Request failed",{
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    statusCode,
    message: err.message,
    stack: err.stack
   });


    if (err.isJoi) {

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.details.map(detail => ({
                field: detail.path.join("."),
                message: detail.message
            }))
        });
    }


    return res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500
                ? "Internal server error"
                : err.message
    });
};


module.exports = errorHandler;