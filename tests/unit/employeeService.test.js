jest.mock("../../src/repositories/employeeRepository", () => ({
    getAll: jest.fn(),
    getById: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
}));

const employeeService =
    require("../../src/services/employeeService");

const employeeRepository =
    require("../../src/repositories/employeeRepository");


describe("EmployeeService", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    describe("getEmployeeById", () => {

        it("should return employee when employee exists", async () => {

            const mockEmployee = {
                Id: 1,
                Name: "Ayush",
                Email: "ayush@example.com",
                Department: "IT",
                Salary: 75000
            };

            employeeRepository.getById
                .mockResolvedValue(mockEmployee);


            const result =
                await employeeService.getEmployeeById(1);


            expect(
                employeeRepository.getById
            ).toHaveBeenCalledWith(1);

            expect(result)
                .toEqual(mockEmployee);
        });


        it("should return undefined when employee does not exist", async () => {

            employeeRepository.getById
                .mockResolvedValue(undefined);


            const result =
                await employeeService.getEmployeeById(999);


            expect(result)
                .toBeUndefined();

            expect(
                employeeRepository.getById
            ).toHaveBeenCalledWith(999);
        });

    });


    describe("createEmployee", () => {

        it("should create employee when email does not exist", async () => {

            const newEmployee = {
                name: "John",
                email: "john@example.com",
                department: "IT",
                salary: 80000
            };


            employeeRepository.findByEmail
                .mockResolvedValue(undefined);


            employeeRepository.create
                .mockResolvedValue({
                    Id: 10,
                    Name: "John",
                    Email: "john@example.com",
                    Department: "IT",
                    Salary: 80000
                });


            const result =
                await employeeService.createEmployee(
                    newEmployee
                );


            expect(
                employeeRepository.findByEmail
            ).toHaveBeenCalledWith(
                "john@example.com"
            );


            expect(
                employeeRepository.create
            ).toHaveBeenCalledWith(
                newEmployee
            );


            expect(result.Id)
                .toBe(10);
        });


        it("should throw 409 when email already exists", async () => {

            employeeRepository.findByEmail
                .mockResolvedValue({
                    Id: 1,
                    Email: "john@example.com"
                });


            await expect(
                employeeService.createEmployee({
                    name: "John",
                    email: "john@example.com",
                    department: "IT",
                    salary: 80000
                })
            ).rejects.toMatchObject({
                statusCode: 409,
                message:
                    "Employee with this email already exists"
            });


            expect(
                employeeRepository.create
            ).not.toHaveBeenCalled();
        });

    });

});