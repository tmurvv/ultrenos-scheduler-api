import request from "supertest";

import { createServer } from "create-server";
import { describe } from "mocha";

describe("auth routes", function () {
  it("login responds with 200", async function () {
    const app = await createServer();

    request(app).post("/v1/auth/login").expect(200);
  });
});
