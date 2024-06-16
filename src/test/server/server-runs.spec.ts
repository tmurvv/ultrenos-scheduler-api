import { describe } from "mocha";
import request from "supertest";

import { createServer } from "create-server";

describe("server checks", () => {
  it("server is created without error", async () => {
    const app = await createServer();

    request(app).get("/health").expect(200);
  });
});
