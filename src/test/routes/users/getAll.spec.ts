import request from "supertest";

import { createServer } from "create-server";
import { describe } from "mocha";

describe("user routes", function () {
  it("getAll responds with 200", async function () {
    const app = await createServer();

    request(app).get("/v1/users").expect(200);
  });
});
