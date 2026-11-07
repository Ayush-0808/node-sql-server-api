const { sql, poolPromise } = require("../config/db");

class EmployeeRepository {

    async getAll() {

        const pool = await poolPromise;

        const result = await pool
            .request()
            .execute("sp_Employee_GetAll");

        return result.recordset;
    }


    async getById(id) {

        const pool = await poolPromise;

        const result = await pool
            .request()
            .input("Id", sql.Int, id)
            .execute("sp_Employee_GetById");

        return result.recordset[0];
    }


    async findByEmail(email) {

        const pool = await poolPromise;

        const result = await pool
            .request()
            .input("Email", sql.NVarChar(150), email)
            .execute("sp_Employee_GetByEmail");

        return result.recordset[0];
    }


    async create(employee) {

        const pool = await poolPromise;

        const result = await pool
            .request()
            .input("Name", sql.NVarChar(100), employee.name)
            .input("Email", sql.NVarChar(150), employee.email)
            .input("Department", sql.NVarChar(100), employee.department)
            .input("Salary", sql.Decimal(18, 2), employee.salary)
            .execute("sp_Employee_Create");

        return result.recordset[0];
    }


    async update(id, employee) {

        const pool = await poolPromise;

        const result = await pool
            .request()
            .input("Id", sql.Int, id)
            .input("Name", sql.NVarChar(100), employee.name)
            .input("Email", sql.NVarChar(150), employee.email)
            .input("Department", sql.NVarChar(100), employee.department)
            .input("Salary", sql.Decimal(18, 2), employee.salary)
            .execute("sp_Employee_Update");

        return result.recordset[0];
    }


    async delete(id) {

        const pool = await poolPromise;

        const result = await pool
            .request()
            .input("Id", sql.Int, id)
            .execute("sp_Employee_Delete");

        return result.recordset[0];
    }
}


module.exports = new EmployeeRepository();