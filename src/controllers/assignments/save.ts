import { Request, Response } from "express";
import { omit } from "lodash";

import { Assignment } from "../../models/assignment-schema";

export const save = async (req: Request, res: Response) => {
  let returnedAssignment: object | null = {};

  try {
    returnedAssignment = await Assignment.findOneAndUpdate(
      { id: req.body.id },
      {
        ...req.body,
        id: req.params.id,
      },
      { upsert: true }
    );
  } catch (e) {
    if (e instanceof Error) {
      return res.send(`Error on save: ${e.message}`);
    }

    return res.send("Error on save");
  }

  res
    .status(200)
    .json({ status: 200, data: omit(returnedAssignment, ["__v", "_id"]) });
};
