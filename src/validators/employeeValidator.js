const Joi = require("joi");


const createEmployeeSchema = Joi.object({

    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must contain at least 2 characters",
            "string.max": "Name cannot exceed 100 characters",
            "any.required": "Name is required"
        }),

    email: Joi.string()
        .trim()
        .email()
        .max(150)
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email",
            "string.max": "Email cannot exceed 150 characters",
            "any.required": "Email is required"
        }),

    department: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Department is required",
            "string.min": "Department must contain at least 2 characters",
            "string.max": "Department cannot exceed 100 characters",
            "any.required": "Department is required"
        }),

    salary: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
            "number.base": "Salary must be a number",
            "number.positive": "Salary must be greater than 0",
            "any.required": "Salary is required"
        })
});


const updateEmployeeSchema = Joi.object({

    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    email: Joi.string()
        .trim()
        .email()
        .max(150)
        .required(),

    department: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    salary: Joi.number()
        .positive()
        .precision(2)
        .required()
});


/*
 * Route parameter validation
 *
 * Example:
 *
 * GET /api/employees/10
 *
 * req.params = {
 *     id: "10"
 * }
 */

const employeeIdSchema = Joi.object({

    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Employee ID must be a number",
            "number.integer": "Employee ID must be an integer",
            "number.positive": "Employee ID must be a positive integer",
            "any.required": "Employee ID is required"
        })

});
const employeeEmailSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .max(150)
        .required()
        .messages({
            "string.email": "Please provide a valid email address",
            "string.max": "Email cannot exceed 150 characters",
            "any.required": "Email is required"
        })
});


module.exports = {
    createEmployeeSchema,
    updateEmployeeSchema,
    employeeIdSchema,
    employeeEmailSchema
};