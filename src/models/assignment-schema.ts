import { Document, Schema, model } from "mongoose";

export interface IAssignment extends Document {
  projectManagerId: String;
  id: String;
  timeIn: Date;
  timeOut: Date;
  timeEntered: Date;
  location: String;
  typeOfWork: String;
  resourceId: String;
  notes: String;
}

const assignmentSchema = new Schema<IAssignment>({
  id: { type: String, required: true },
  projectManagerId: { type: String, required: true },
  timeIn: { type: Date, required: true },
  timeOut: { type: Date },
  allDay: { type: Boolean},
  timeEntered: { type: Date, required: true },
  location: { type: String, required: true },
  typeOfWork: {
    type: String,
    enum: ["painting", "flooring", "deck", "landscape", "plumbing", "cabinets"],
  },
  resourceId: { type: String },
  notes: { type: String },
});

assignmentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

assignmentSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

export const Assignment = model("assignment", assignmentSchema);
