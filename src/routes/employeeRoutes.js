const express = require("express");

const router = express.Router();

const employeeController =
    require("../controllers/employeeController");

const validate =
    require("../middleware/validationMiddleware");

const authenticateToken =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/roleMiddleware");

const {
    createEmployeeSchema,
    updateEmployeeSchema,
    employeeIdSchema,
    employeeEmailSchema
} = require("../validators/employeeValidator");

/**
 * @openapi
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     description: Returns a list of all employees.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *         apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Insufficient permissions
 *       500:
 *         description: Internal server error
 */

router.get(
    "/",
    authenticateToken,
    authorizeRoles("Admin", "User"),
    employeeController.getAll
);

/**
 * @openapi
 * /api/employees/email/{email}:
 *   get:
 *     summary: Get employee by email
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Employee email
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */

router.get(
    "/email/:email",
    authenticateToken,
    authorizeRoles("Admin", "User"),
    validate(employeeEmailSchema, "params"),
    employeeController.getByEmail
);


/**
 * @openapi
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get(
    "/:id",
    authenticateToken,
    authorizeRoles("Admin", "User"),
    validate(employeeIdSchema, "params"),
    employeeController.getById
);

/**
 * @openapi
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeInput'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       409:
 *         description: Employee email already exists
 *       500:
 *         description: Internal server error
 */
router.post(
    "/",
    authenticateToken,
    authorizeRoles("Admin"),
    validate(createEmployeeSchema, "body"),
    employeeController.create
);


/**
 * @openapi
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeInput'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */

router.put(
      "/:id",
    authenticateToken,
    authorizeRoles("Admin"),
    validate(employeeIdSchema, "params"),
    validate(updateEmployeeSchema, "body"),
    employeeController.update
);


/**
 * @openapi
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */

router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("Admin"),
    validate(employeeIdSchema, "params"),
    employeeController.delete
);


module.exports = router;