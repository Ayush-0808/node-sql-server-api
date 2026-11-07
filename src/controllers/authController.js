const authService =
    require("../services/authService");

const asyncHandler =
    require("../middleware/asyncHandler");


class AuthController {

    login = asyncHandler(async (req, res) => {

        const { username, password } =
            req.body;


        const result =
            await authService.login(
                username,
                password
            );


        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });
    });
}


module.exports = new AuthController();