const employeeService =
    require("../services/employeeService");

const asyncHandler =
    require("../middleware/asyncHandler");


class EmployeeController {


    getAll = asyncHandler(async (req, res) => {

        const employees =
            await employeeService.getAllEmployees();

        res.status(200).json({
            success: true,
            data: employees
        });

    });


    getById = asyncHandler(async (req, res) => {

        const id = req.params.id;

        const employee =
            await employeeService.getEmployeeById(id);

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            data: employee
        });

    });


    create = asyncHandler(async (req, res) => {

        const employee =
            await employeeService.createEmployee(req.body);

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee
        });

    });


    update = asyncHandler(async (req, res) => {

        const id = req.params.id;

        const employee =
            await employeeService.updateEmployee(
                id,
                req.body
            );

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: employee
        });

    });


    delete = asyncHandler(async (req, res) => {

        const id = req.params.id;

        const employee =
            await employeeService.deleteEmployee(id);

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
            data: employee
        });

    });

    getByEmail = asyncHandler(async (req, res) => {

    const email = req.params.email;

    const employee =
        await employeeService.getEmployeeByEmail(email);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: "Employee not found"
        });
    }

    res.status(200).json({
        success: true,
        data: employee
    });
});

}


module.exports = new EmployeeController();