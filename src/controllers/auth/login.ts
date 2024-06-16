import "dotenv/config";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { User } from "../../models/user-schema";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const found: InstanceType<typeof User> | null = await User.findOne({
    email: req.body.email,
  });

  if (!found) {
    console.log('in login not found')
    return next("Email not found.");
  }

  found.comparePasswords(req.body.password, function (err, isMatch) {
    if (isMatch) {
      const token = jwt.sign(
        { id: found.id, role: "user" },
        "Why cant I get my secret from dot env"
      );

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ status: "success", data: found.set(found) });
    } else {
      return next("Password does not match our records.");
    }
  });
};
