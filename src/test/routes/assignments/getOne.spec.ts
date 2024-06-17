import request from "supertest";

import { createServer } from "create-server";
import { describe } from "mocha";

describe("assignment routes", function () {
  it("getOne responds with 200", async function () {
    const app = await createServer();

    request(app).get("/v1/assignments/getId").expect(200);
  });
});
