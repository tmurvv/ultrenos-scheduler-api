import { Request, Response } from "express";

import { User } from "../../models/user-schema";

export const del = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findOneAndDelete({ id });

  res.status(204).json("Delete route working. Function NYI");
};
