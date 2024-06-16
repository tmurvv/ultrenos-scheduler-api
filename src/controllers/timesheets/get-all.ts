import { Request, Response } from "express";
import { Timesheet } from "../../models/timesheet-schema";

export const getAll = async (req: Request, res: Response) => {
  const data: object[] = await Timesheet.find({});

  if (!data) {
    return res
      .status(404)
      .json({ status: "fail", message: "no data found", data: [] });
  }

  const length = data.length;

  return res.status(200).json({
    status: "success",
    message: `returning ${length} timesheet${length === 1 ? "" : "s"}`,
    data,
  });
};
