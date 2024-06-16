import { NextFunction, Request, Response } from "express";
import { save } from "../users/save";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await save(req, res, next);
};
