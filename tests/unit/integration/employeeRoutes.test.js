const request =
    require("supertest");

const app =
    require("../../../app");


describe("Employee API", () => {

    it("should return 404 for unknown employee route", async () => {

        const response =
            await request(app)
                .get("/api/does-not-exist");


        expect(response.statusCode)
            .toBe(404);


        expect(response.body.success)
            .toBe(false);


        expect(response.body.message)
            .toContain("Route");
    });

});