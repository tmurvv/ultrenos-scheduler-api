import { Request, Response } from "express";
import {Assignment} from "../../models/assignment-schema";

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const assignment = await Assignment.findOne({ id });

  res.status(200).json(assignment);
};
