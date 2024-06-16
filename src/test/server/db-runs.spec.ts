import { describe } from "mocha";
import request from "supertest";

import { createServer } from "create-server";

describe("db checks", () => {
  it("db is connected without error", async () => {
    const app = await createServer();

    request(app).get("/health").expect(200);
  });
});
