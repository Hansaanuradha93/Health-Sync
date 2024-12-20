const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Load environment variables
dotenv.config({ path: "../config.env" });

describe("GET /patients", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/api/v1/patients");

    expect(response.status).toBe(200);
  });
});

// describe("Patient Service", () => {
//   it("should fetch all patients successfully", async () => {
//     const host =
//       "http://ad36db3775bff4ddf98251312f2a7e8a-1830202517.us-west-1.elb.amazonaws.com:8080";
//     const url = `${host}/api/v1/patients`;

//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGM4YTY1MmVkNTBiMmM3YmMyMTJjNyIsImlhdCI6MTczNDQzOTUyMiwiZXhwIjoxNzM1MDQ0MzIyfQ.LnBgnQjPK6mPKX8sCXalfJGunK8WZdC_xzNg_TEslWk";
//     const response = await request(app)
//       .get("/api/v1/patients")
//       .set("Authorization", `Bearer ${token}`);

//     // Verify the response
//     expect(response.status).toBe(200); // Ensure the status code is 200
//     expect(response.body).toHaveProperty("status", "success"); // Verify the status
//     expect(response.body.data).toHaveProperty("patients"); // Check if 'patients' data exists
//     expect(Array.isArray(response.body.data.patients)).toBe(true); // Ensure 'patients' is an array
//   });
// });
