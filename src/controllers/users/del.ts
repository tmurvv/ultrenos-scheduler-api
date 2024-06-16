import { Request, Response } from "express";

export const del = (req: Request, res: Response) => {
  res.status(204).send("Delete route working. Function NYI");
};
