import { Request, Response } from "express";
import { omit } from "lodash";

import { Timesheet } from "../../models/timesheet-schema";

export const save = async (req: Request, res: Response) => {
  let returnedTimesheet: object | null = {};

  try {
    returnedTimesheet = await Timesheet.findOneAndUpdate(
      { id: req.body.id },
      {
        ...req.body,
        lunchInMinutes: +req.body.lunchInMinutes,
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
    .json({ status: 200, data: omit(returnedTimesheet, ["__v", "_id"]) });
};
