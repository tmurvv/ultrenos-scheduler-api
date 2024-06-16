import { Request, Response } from "express";

import { User } from "../../models/user-schema";

export const getOne = async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  res.status(200).json(user);
};
