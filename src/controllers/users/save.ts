import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";

import { User } from "../../models/user-schema";

const saveUser = async (req: Request, res: Response) => {
  let returnedUser: object | null = {};

  try {
    returnedUser = await User.findOneAndUpdate(
      { id: req.body.id },
      { ...req.body, ...req.params },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .json({ status: 200, data: omit(returnedUser, ["__v", "_id"]) });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(JSON.stringify(e));
    }
  }
};

export const save = async (req: Request, res: Response, next: NextFunction) => {
  let returnedUser: object | null | undefined = {};
  let password = req.body?.password;
  const hasPassword = !!password;

  if (hasPassword) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (hasPassword) {
          req.body = { ...req.body, password: hash };
        }

        try {
          await saveUser(req, res);
        } catch (e) {
          return next(JSON.stringify(e));
        }
      });
    });
  } else {
    try {
      await saveUser(req, res);
    } catch (e) {
      return next(JSON.stringify(e));
    }
  }
};
