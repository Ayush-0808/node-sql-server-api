const { sql, poolPromise } =
    require("../config/db");


class UserRepository {

    async getByUsername(username) {

        const pool = await poolPromise;

        const result = await pool
            .request()
            .input(
                "Username",
                sql.NVarChar(100),
                username
            )
            .execute("sp_User_GetByUsername");

        return result.recordset[0];
    }
}


module.exports = new UserRepository();