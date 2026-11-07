const bcrypt = require("bcryptjs");

const authService =
    require("../../src/services/authService");

const userRepository =
    require("../../src/repositories/userRepository");

jest.mock("../../src/repositories/userRepository");


describe("AuthService", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    it("should login successfully with valid credentials", async () => {

        const password = "Admin@123";

        const passwordHash =
            await bcrypt.hash(password, 10);


        userRepository.getByUsername
            .mockResolvedValue({
                Id: 1,
                Username: "admin",
                PasswordHash: passwordHash,
                Role: "Admin"
            });


        const result =
            await authService.login(
                "admin",
                password
            );


        expect(result.token).toBeDefined();

        expect(result.user).toEqual({
            id: 1,
            username: "admin",
            role: "Admin"
        });
    });


    it("should reject invalid username", async () => {

        userRepository.getByUsername
            .mockResolvedValue(undefined);


        await expect(
            authService.login(
                "unknown",
                "Admin@123"
            )
        ).rejects.toMatchObject({
            statusCode: 401,
            message: "Invalid username or password"
        });
    });


    it("should reject invalid password", async () => {

        const passwordHash =
            await bcrypt.hash(
                "CorrectPassword",
                10
            );


        userRepository.getByUsername
            .mockResolvedValue({
                Id: 1,
                Username: "admin",
                PasswordHash: passwordHash,
                Role: "Admin"
            });


        await expect(
            authService.login(
                "admin",
                "WrongPassword"
            )
        ).rejects.toMatchObject({
            statusCode: 401,
            message: "Invalid username or password"
        });
    });

});