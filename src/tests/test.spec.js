import { expect, use } from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

import generateToken from "../utils/generateToken.js";
const TOKEN = generateToken("661d69aa8d310ac2fbb08e90");

const server = use(chaiHttp);

describe("User API Endpoints", () => {
    describe("POST /api/user/register", () => {
        it("should register a new user", async () => {
            const res = await server
                .request(app)
                .post("/api/user/register")
                .send({
                    fullName: "John Doe",
                    email: "john.doe@example.com",
                    password: "password123",
                    username: "johndoe123",
                });
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("_id");
        });
    });

    describe("POST /api/user/login", () => {
        it("should not log in a user with invalid credentials", async () => {
            const res = await server.request(app).post("/api/user/login").send({
                email: "john.doe@example.com",
                password: "invalidpassword",
            });
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
        });

        it("should log in an existing user", async () => {
            const res = await server.request(app).post("/api/user/login").send({
                email: "john.doe@example.com",
                password: "password123",
            });

            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("userToken");

            // Delete the user after the test
            await server
                .request(app)
                .delete(`/api/user/profile/${res.body._id}/delete`)
                .set("Authorization", `Bearer ${res.body.userToken}`);
        });
    });
});

describe("Task API Endpoints", () => {
    describe("GET /api/tasks", () => {
        it("should return all tasks", async () => {
            const res = await server
                .request(app)
                .get("/api/tasks")
                .set("Authorization", `Bearer ${TOKEN}`);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
        });
    });
});
