import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../error";

interface UserPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new UnauthorizedError("Unauthorized Error");

    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;

    req.currentUser = payload;
  } catch (err) {}

  next();
};
