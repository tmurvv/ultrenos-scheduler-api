import bcrypt from "bcrypt";
import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  email: String;
  password: string | Buffer;
  id: String;
  firstName: String;
  lastName: String;
  role: String;
  comparePasswords(
    candidatePassword: string,
    next: (err: Error | null, same: boolean | null) => void
  ): void;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: {type: String, enum: ["admin", "user", "project-manager"], default: "user"}
});

userSchema.methods.comparePasswords = function (
  candidatePassword: string,
  next: (err: Error | null, same: boolean | null) => void
) {
  bcrypt.compare(candidatePassword, this.password, function (err: Error | undefined, isMatch: boolean) {
    if (err) {
      return next(err, null);
    }
    next(null, isMatch);
  });
};

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

userSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

export const User = model("user", userSchema);
