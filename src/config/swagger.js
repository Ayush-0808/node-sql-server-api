
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Node SQL Server API",
            version: "1.0.0",
            description:
                "A simple Express API application with Swagger"
        },

        servers: [
            {
                url:
                    process.env.SWAGGER_SERVER_URL ||
                    "http://localhost:5000",

                description:
                    process.env.SWAGGER_SERVER_DESCRIPTION ||
                    "Local Development server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                },

                apiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-api-key"
                }
            },

            schemas: {
                EmployeeInput: {
                    type: "object",

                    required: [
                        "name",
                        "email",
                        "department",
                        "salary"
                    ],

                    properties: {
                        name: {
                            type: "string",
                            example: "John Doe"
                        },

                        email: {
                            type: "string",
                            format: "email",
                            example: "john.doe@example.com"
                        },

                        department: {
                            type: "string",
                            example: "IT"
                        },

                        salary: {
                            type: "number",
                            format: "double",
                            example: 75000
                        }
                    }
                },

                Employee: {
                    type: "object",

                    properties: {
                        Id: {
                            type: "integer",
                            example: 1
                        },

                        Name: {
                            type: "string",
                            example: "John Doe"
                        },

                        Email: {
                            type: "string",
                            format: "email",
                            example: "john.doe@example.com"
                        },

                        Department: {
                            type: "string",
                            example: "IT"
                        },

                        Salary: {
                            type: "number",
                            format: "double",
                            example: 75000
                        },

                        CreatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                ErrorResponse: {
                    type: "object",

                    properties: {
                        success: {
                            type: "boolean",
                            example: false
                        },

                        message: {
                            type: "string",
                            example: "Something went wrong"
                        }
                    }
                }
            }
        }
    },

    apis: ["./src/routes/*.js"],

    failOnErrors: true
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
