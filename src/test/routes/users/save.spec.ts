import request from "supertest";

import { createServer } from "create-server";
import { describe } from "mocha";

describe("user routes", function () {
  it("save responds with 200", async function () {
    const app = await createServer();

    request(app).post("/v1/users/saveId").expect(200);
  });
});
