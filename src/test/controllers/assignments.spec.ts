import { Application } from "express";
import { expect } from "chai";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { Assignment } from "../../models/assignment-schema";
import connect, { MongodHelper } from "../with-mongodb-memory-server";
import { createServer } from "../../create-server";

describe("assignment service", () => {
  let mongodHelper: MongodHelper;
  let app: Application;

  const assignment = {
    userId: uuid(),
    id: uuid(),
    timeIn: new Date(),
    timeOut: new Date(new Date().getTime() + 2 * 60 * 1000),
    timeEntered: new Date(),
    location: "A location",
    typeOfWork: "painting",
    notes: "These are some notes.",
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

  it("should create a assignment", async () => {
    const testAssignment = new Assignment(assignment);
    const savedAssignment = await testAssignment.save();

    expect(savedAssignment.id).to.exist;
    expect(savedAssignment.userId).to.equal(assignment.userId);
    expect(savedAssignment.timeIn).to.equal(assignment.timeIn);
    expect(savedAssignment.timeOut).to.equal(assignment.timeOut);
    expect(savedAssignment.timeEntered).to.equal(assignment.timeEntered);
    expect(savedAssignment.location).to.equal(assignment.location);
    expect(savedAssignment.typeOfWork).to.equal(assignment.typeOfWork);
    expect(savedAssignment.notes).to.equal(assignment.notes);
  });

  it("GET assignment responds with correct assignment", async function () {
    // create assignment
    const testAssignment = new Assignment(assignment);
    await testAssignment.save();

    const returned = await request(app).get(
      `/v1/assignments/${testAssignment.id}`
    );

    expect(returned.status).to.equal(200);
  });

  it("GET all assignments responds with assignments", async function () {
    const testAssignment = new Assignment(assignment);
    const testAssignment2 = new Assignment(assignment);
    await testAssignment.save();
    await testAssignment2.save();

    const returned = await request(app).get(`/v1/assignments`);

    expect(returned.statusCode).to.equal(200);
    expect(returned.body.data).to.be.an("array");
    expect(returned.body.data).to.have.lengthOf(2);
  });
});
