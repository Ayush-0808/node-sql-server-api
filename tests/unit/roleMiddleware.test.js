const authorizeRoles =
    require("../../src/middleware/roleMiddleware");


describe("Role Middleware", () => {

    let req;
    let res;
    let next;


    beforeEach(() => {

        req = {};

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();

    });


    test("should reject request when user is not authenticated", () => {

        const middleware =
            authorizeRoles("Admin");

        middleware(req, res, next);


        expect(res.status)
            .toHaveBeenCalledWith(401);

        expect(res.json)
            .toHaveBeenCalledWith({
                success: false,
                message: "Authentication required"
            });

        expect(next)
            .not.toHaveBeenCalled();

    });


    test("should reject user with insufficient role", () => {

        req.user = {
            userId: 2,
            username: "ayush",
            role: "User"
        };


        const middleware =
            authorizeRoles("Admin");

        middleware(req, res, next);


        expect(res.status)
            .toHaveBeenCalledWith(403);

        expect(res.json)
            .toHaveBeenCalledWith({
                success: false,
                message:
                    "Forbidden: You do not have permission to access this resource"
            });

        expect(next)
            .not.toHaveBeenCalled();

    });


    test("should allow user with permitted role", () => {

        req.user = {
            userId: 1,
            username: "admin",
            role: "Admin"
        };


        const middleware =
            authorizeRoles("Admin");

        middleware(req, res, next);


        expect(next)
            .toHaveBeenCalled();

    });


    test("should allow any of multiple permitted roles", () => {

        req.user = {
            userId: 2,
            username: "ayush",
            role: "User"
        };


        const middleware =
            authorizeRoles(
                "Admin",
                "User"
            );

        middleware(req, res, next);


        expect(next)
            .toHaveBeenCalled();

    });

});