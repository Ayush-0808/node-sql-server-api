require("dotenv").config();

const app =
    require("../app");

const logger =
    require("../utils/logger");

const PORT =
    process.env.PORT || 5000;


const server = app.listen(
    PORT,
    () => {

        logger.info(
            `Server running on http://localhost:${PORT}`
        );

    }
);


process.on(
    "unhandledRejection",
    (reason) => {

        logger.error(
            "Unhandled Promise Rejection",
            {
                reason
            }
        );

    }
);


process.on(
    "uncaughtException",
    (error) => {

        logger.error(
            "Uncaught Exception",
            {
                message: error.message,
                stack: error.stack
            }
        );

    }
);