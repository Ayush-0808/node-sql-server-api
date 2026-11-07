const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRepository =
    require("../repositories/userRepository");


class AuthService {

    async login(username, password) {

        const user =
            await userRepository.getByUsername(username);

        if (!user) {

            const error =
                new Error("Invalid username or password");

            error.statusCode = 401;

            throw error;
        }


        const passwordMatches =
            await bcrypt.compare(
                password,
                user.PasswordHash
            );


        if (!passwordMatches) {

            const error =
                new Error("Invalid username or password");

            error.statusCode = 401;

            throw error;
        }


        const token = jwt.sign(
            {
                userId: user.Id,
                username: user.Username,
                role: user.Role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN || "1h"
            }
        );


        return {
            token,
            user: {
                id: user.Id,
                username: user.Username,
                role: user.Role
            }
        };
    }
}


module.exports = new AuthService();