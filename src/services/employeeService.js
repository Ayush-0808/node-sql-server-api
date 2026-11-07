const employeeRepository =
    require("../repositories/employeeRepository");


class EmployeeService {

    async getAllEmployees() {

        return await employeeRepository.getAll();
    }


    async getEmployeeById(id) {

        return await employeeRepository.getById(id);
    }


    async getEmployeeByEmail(email) {

        return await employeeRepository.findByEmail(email);
    }


   async createEmployee(employee) {

    const existingEmployee =
        await employeeRepository.findByEmail(
            employee.email
        );

    if (existingEmployee) {

        const error = new Error(
            "Employee with this email already exists"
        );

        error.statusCode = 409;

        throw error;
    }

    return await employeeRepository.create(employee);
}


    async updateEmployee(id, employee) {

        return await employeeRepository.update(
            id,
            employee
        );
    }


    async deleteEmployee(id) {

        return await employeeRepository.delete(id);
    }
}


module.exports = new EmployeeService();