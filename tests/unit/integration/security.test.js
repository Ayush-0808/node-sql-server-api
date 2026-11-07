const request =
   require("supertest");

   const app =
     require("../../../app")

describe("Security", () => {

    it("should reject employee request without JWT", async () => {

        const response =
            await request(app)
                .get("/api/employees");


        expect(response.statusCode)
            .toBe(401);


        expect(response.body.success)
            .toBe(false);


        expect(response.body.message)
            .toBe("Authorization header is required");
    });

});