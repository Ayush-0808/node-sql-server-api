const jwt = require("jsonwebtoken");

const authMiddleware =
    require("../../src/middleware/authMiddleware");


describe("Auth Middleware", () => {

    let req;
    let res;
    let next;


    beforeEach(() => {

        req = {
            headers: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();

    });


    test("should reject request when Authorization header is missing", () => {

        authMiddleware(req, res, next);

        expect(res.status)
            .toHaveBeenCalledWith(401);

        expect(res.json)
            .toHaveBeenCalledWith({
                success: false,
                message: "Authorization header is required"
            });

        expect(next)
            .not.toHaveBeenCalled();

    });


    test("should reject invalid authorization format", () => {

        req.headers.authorization = "InvalidToken";

        authMiddleware(req, res, next);

        expect(res.status)
            .toHaveBeenCalledWith(401);

        expect(res.json)
            .toHaveBeenCalledWith({
                success: false,
                message: "Invalid authorization format"
            });

        expect(next)
            .not.toHaveBeenCalled();

    });


    test("should reject authorization when scheme is not Bearer", () => {

        req.headers.authorization =
            "Basic abc123";

        authMiddleware(req, res, next);

        expect(res.status)
            .toHaveBeenCalledWith(401);

        expect(res.json)
            .toHaveBeenCalledWith({
                success: false,
                message: "Invalid authorization format"
            });

        expect(next)
            .not.toHaveBeenCalled();

    });


    test("should reject invalid JWT", () => {

        req.headers.authorization =
            "Bearer invalid-token";

        authMiddleware(req, res, next);

        expect(res.status)
            .toHaveBeenCalledWith(401);

        expect(res.json)
            .toHaveBeenCalledWith({
                success: false,
                message: "Invalid or expired token"
            });

        expect(next)
            .not.toHaveBeenCalled();

    });


    test("should accept valid JWT", () => {

        process.env.JWT_SECRET =
            "test_secret";

        const token = jwt.sign(
            {
                userId: 1,
                username: "admin",
                role: "Admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );


        req.headers.authorization =
            `Bearer ${token}`;


        authMiddleware(req, res, next);


        expect(next)
            .toHaveBeenCalled();

        expect(req.user)
            .toMatchObject({
                userId: 1,
                username: "admin",
                role: "Admin"
            });

    });

});