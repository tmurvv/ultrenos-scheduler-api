import { Application } from "express";
import { expect } from "chai";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { User } from "../../models/user-schema";
import { SimpleUser } from "../../Interfaces/simple-user";
import connect, { MongodHelper } from "../with-mongodb-memory-server";
import { createServer } from "../../create-server";

describe("user service", () => {
  let mongodHelper: MongodHelper;
  let app: Application;

  const user = {
    email: "me@me.com",
    password: "myPassword",
    firstName: "Test",
    lastName: "User",
    id: uuid(),
  };

  before(async () => {
    mongodHelper = await connect();
    app = await createServer();
  });

  afterEach(async () => {
    await mongodHelper.clearDatabase();
  });

  after(async () => {
    await mongodHelper.closeDatabase();
  });

  it("should create a user", async () => {
    const testUser = new User(user);
    const savedUser: SimpleUser = await User.findOneAndUpdate(
      { id: testUser.id },
      testUser,
      { returnOriginal: false, upsert: true }
    );

    expect(savedUser.id).to.exist;
    expect(savedUser.email).to.equal(user.email);
    expect(savedUser.firstName).to.equal(user.firstName);
    expect(savedUser.lastName).to.equal(user.lastName);
  });

  it("GET user responds with correct user", async function () {
    // create user
    const testUser = new User(user);
    await User.findOneAndUpdate({ id: testUser.id }, testUser, {
      upsert: true,
    });

    const returned = await request(app).get(`/v1/users/${testUser.email}`);

    expect(returned.status).to.equal(200);
    expect(returned.body.email).to.equal("me@me.com");
    expect(returned.body.id).to.equal(testUser.id);
  });

  it("GET all users responds with an array of simple users when users exist", async function () {
    // create user
    const testUser = new User(user);
    await User.findOneAndUpdate({ id: testUser.id }, testUser, {
      upsert: true,
    });

    // test returned user
    const returned = await request(app).get(`/v1/users`);
    expect(returned.status).to.equal(200);
    expect(returned.body).to.be.an("array");
    expect(returned.body[0].email).to.exist;
    expect(returned.body[0].id).to.exist;
    expect(returned.body[0].firstName).to.exist;
    expect(returned.body[0].lastName).to.exist;
  });
  it("GET all users responds with an empty array when no users exist", async function () {
    const returned = await request(app).get(`/v1/users`);
    expect(returned.status).to.equal(200);
    expect(returned.body.length).to.equal(0);
  });
});
