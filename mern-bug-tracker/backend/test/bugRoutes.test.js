const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Bug = require("../models/Bug");
const bugRoutes = require("../routes/bugRoutes");

dotenv.config();

// Initialize Express app and use bugRoutes
const app = express();
app.use(express.json());
app.use("/api/bugs", bugRoutes);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

// Mock Data
const mockBug = {
    title: "Test Bug",
    description: "This is a test bug",
    status: "open"
};

// Test POST /api/bugs (Create Bug)
describe("POST /api/bugs", () => {
    it("should create a new bug", async () => {
        const res = await request(app)
            .post("/api/bugs")
            .send(mockBug);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.title).toBe(mockBug.title);
    });

    it("should return 400 if required fields are missing", async () => {
        const res = await request(app)
            .post("/api/bugs")
            .send({ title: "" });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error");
    });
});

// Test GET /api/bugs (Fetch Bugs)
describe("GET /api/bugs", () => {
    it("should return all bugs", async () => {
        const res = await request(app).get("/api/bugs");
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

// Test GET /api/bugs/:id (Fetch Single Bug)
describe("GET /api/bugs/:id", () => {
    it("should return a single bug by ID", async () => {
        const newBug = await Bug.create(mockBug);
        const res = await request(app).get(`/api/bugs/${newBug._id}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(mockBug.title);
    });

    it("should return 404 if bug is not found", async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/bugs/${fakeId}`);

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("error");
    });
});

// Test PUT /api/bugs/:id (Update Bug)
describe("PUT /api/bugs/:id", () => {
    it("should update an existing bug", async () => {
        const newBug = await Bug.create(mockBug);
        const res = await request(app)
            .put(`/api/bugs/${newBug._id}`)
            .send({ status: "resolved" });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("resolved");
    });
});

// Test DELETE /api/bugs/:id (Delete Bug)
describe("DELETE /api/bugs/:id", () => {
    it("should delete a bug", async () => {
        const newBug = await Bug.create(mockBug);
        const res = await request(app).delete(`/api/bugs/${newBug._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Bug deleted successfully");
    });
});
