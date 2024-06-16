import { Request, Response } from "express";

import { Timesheet } from "../../models/timesheet-schema";
import { User } from "../../models/user-schema";

const getUserId = async (id: string) => {
  if (id.includes("@")) {
    const user = await User.findOne({ email: id });
    if (user) return user ? user.id : undefined;
  }

  return id;
};

export const getAllByUser = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const userId = await getUserId(id);

  const result = await Timesheet.find({ userId });

  res.json(result);
};
