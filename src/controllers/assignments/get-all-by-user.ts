import { Request, Response } from "express";

import { Assignment } from "../../models/assignment-schema";
import { User } from "../../models/user-schema";

const getUserId = async (id: string) => {
  if (id.includes("@")) {
    const user: User = await User.findOne({ email: id });
    if (user) return user ? user.id : undefined;
  }

  return id;
};

export const getAllByUser = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const isEmail: boolean = id.includes("@");

  if (isEmail) {
    const user: User = await User.find({ email: id });
    if (user) return user ? user.id : undefined;
  }

  const result = await Assignment.findOne({ id });

  res.json(result);
};
