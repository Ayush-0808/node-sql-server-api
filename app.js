const express = require("express");
const cors = require("cors");

const swaggerUi =
    require("swagger-ui-express");

const swaggerSpec =
    require("./src/config/swagger");

const employeeRoutes =
    require("./src/routes/employeeRoutes");

const authRoutes =
    require("./src/routes/authRoutes");

const requestLogger =
    require("./src/middleware/requestLogger");

const notFoundHandler =
    require("./src/middleware/notFoundMiddleware");

const errorHandler =
    require("./src/middleware/errorMiddleware");


const app = express();


// Global middleware

app.use(cors());

app.use(express.json());

app.use(requestLogger);


// Swagger

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


// Routes

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/employees",
    employeeRoutes
);


// 404

app.use(notFoundHandler);


// Global error handler

app.use(errorHandler);


module.exports = app;