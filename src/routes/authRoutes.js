const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const validate = require('../middleware/validationMiddleware');

const { loginSchema } = require('../validators/authValidator');

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     description: Authenticate a user and receive a JWT.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Invalid username or password
 */

router.post(
    '/login',
    validate(loginSchema, 'body'),
    authController.login
);

module.exports = router;