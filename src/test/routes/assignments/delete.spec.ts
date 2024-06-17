import request from "supertest";

import { createServer } from "create-server";
import { describe } from "mocha";

describe("assignment routes", function () {
  it("delete responds with 204", async function () {
    const app = await createServer();
    request(app).delete("/v1/assignments/deleteId").expect(204);
  });
});
