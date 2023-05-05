import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../error";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.currentUser) throw new UnauthorizedError();

    next();
  } catch (err) {
    next(err);
  }
};
