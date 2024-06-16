import request from "supertest";

import { createServer } from "create-server";
import { describe } from "mocha";

describe("user routes", function () {
  it("delete responds with 204", async function () {
    const app = await createServer();
    request(app).delete("/v1/users/deleteId").expect(204);
  });
});
