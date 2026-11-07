const sql = require("mssql");
require("dotenv").config();

const logger = require("../../utils/logger");

const requiredEnvVars = [
    "DB_SERVER",
    "DB_DATABASE",
    "DB_USER",
    "DB_PASSWORD"
];

for (const name of requiredEnvVars) {
    if (!process.env[name]) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
}

const config = {
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT || 1433),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        logger.info("Connected to SQL Server");
        return pool;
    })
    .catch((error) => {
        logger.error("Database connection failed:", error);
        throw error;
    });

module.exports = {
    sql,
    poolPromise
};