import { Document, Schema, model } from "mongoose";

export interface ITimesheet extends Document {
  userId: String;
  id: String;
  lunchInMinutes: Number;
  timeIn: Date;
  timeOut: Date;
  timeEntered: Date;
  location: String;
  typeOfWork: String;
  notes: String;
}

const timesheetSchema = new Schema<ITimesheet>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  timeIn: { type: Date, required: true },
  timeOut: { type: Date, required: true },
  timeEntered: { type: Date, required: true },
  location: { type: String, required: true },
  lunchInMinutes: { type: Number, required: true },
  typeOfWork: {
    type: String,
    enum: ["painting", "flooring", "deck", "landscape", "plumbing", "cabinets"],
  },
  notes: { type: String },
});

timesheetSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

timesheetSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

export const Timesheet = model("timesheet", timesheetSchema);
