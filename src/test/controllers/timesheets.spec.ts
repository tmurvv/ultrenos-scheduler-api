import { Application } from "express";
import { expect } from "chai";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { Timesheet } from "../../models/timesheet-schema";
import connect, { MongodHelper } from "../with-mongodb-memory-server";
import { createServer } from "../../create-server";

describe("timesheet service", () => {
  let mongodHelper: MongodHelper;
  let app: Application;

  const timesheet = {
    userId: uuid(),
    id: uuid(),
    timeIn: new Date(),
    timeOut: new Date(new Date().getTime() + 2 * 60 * 1000),
    timeEntered: new Date(),
    location: "A location",
    lunchInMinutes: 30,
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

  it("should create a timesheet", async () => {
    const testTimesheet = new Timesheet(timesheet);
    const savedTimesheet = await testTimesheet.save();

    expect(savedTimesheet.id).to.exist;
    expect(savedTimesheet.userId).to.equal(timesheet.userId);
    expect(savedTimesheet.timeIn).to.equal(timesheet.timeIn);
    expect(savedTimesheet.timeOut).to.equal(timesheet.timeOut);
    expect(savedTimesheet.timeEntered).to.equal(timesheet.timeEntered);
    expect(savedTimesheet.location).to.equal(timesheet.location);
    expect(savedTimesheet.typeOfWork).to.equal(timesheet.typeOfWork);
    expect(savedTimesheet.notes).to.equal(timesheet.notes);
  });

  it("GET timesheet responds with correct timesheet", async function () {
    // create timesheet
    const testTimesheet = new Timesheet(timesheet);
    await testTimesheet.save();

    const returned = await request(app).get(
      `/v1/timesheets/${testTimesheet.id}`
    );

    expect(returned.status).to.equal(200);
  });

  it("GET all timesheets responds with timesheets", async function () {
    const testTimesheet = new Timesheet(timesheet);
    const testTimesheet2 = new Timesheet(timesheet);
    await testTimesheet.save();
    await testTimesheet2.save();

    const returned = await request(app).get(`/v1/timesheets`);

    expect(returned.statusCode).to.equal(200);
    expect(returned.body.data).to.be.an("array");
    expect(returned.body.data).to.have.lengthOf(2);
  });
});
