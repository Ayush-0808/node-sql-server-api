const logger = require("../../utils/logger");

const notFoundHandler = (req, res) => {
    logger.warn("Route not found", {
        requestId: req.requestId,
        method: req.method,
        url: req.originalUrl
    });

    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`,
        requestId: req.requestId
    });
};

module.exports = notFoundHandler;