const Joi = require("joi");

const validate =
    require("../../src/middleware/validationMiddleware");


describe("Validation Middleware", () => {

    let req;
    let res;
    let next;


    const schema = Joi.object({
        name: Joi.string()
            .required()
    });


    beforeEach(() => {

        req = {
            body: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();

    });


    test("should call next when validation succeeds", () => {

        req.body = {
            name: "Ayush"
        };


        const middleware =
            validate(schema, "body");

        middleware(req, res, next);


        expect(next)
            .toHaveBeenCalled();

        expect(req.body)
            .toEqual({
                name: "Ayush"
            });

    });


    test("should return 400 when validation fails", () => {

        req.body = {};


        const middleware =
            validate(schema, "body");

        middleware(req, res, next);


        expect(res.status)
            .toHaveBeenCalledWith(400);

        expect(res.json)
            .toHaveBeenCalled();

        expect(next)
            .not.toHaveBeenCalled();

    });

});