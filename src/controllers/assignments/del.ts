import { Request, Response } from "express";
import {Assignment} from "../../models/assignment-schema";

export const del = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('id', id)
  await Assignment.findOneAndDelete({ id });

  res.status(204).json("Item deleted.");
};
