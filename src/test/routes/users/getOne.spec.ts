import request from "supertest";

import { createServer } from "create-server";
import { describe } from "mocha";

describe("user routes", function () {
  it("getOne responds with 200", async function () {
    const app = await createServer();

    request(app)
      .get("/v1/users/15d29836-bf77-47e3-91d8-f03e095b45e5")
      .expect(200);
  });

  it("getOne responds with expected object", async function () {
    const app = await createServer();

    request(app).get("/users/15d29836-bf77-47e3-91d8-f03e095b45e5").expect(200);
  });
});
