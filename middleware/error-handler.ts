import { Request, Response, NextFunction } from "express";
import { BaseError } from "../error";

export const errorHandler = async (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError") err.statusCode = 400;
  res.status(err?.statusCode || 500).send({
    success: false,
    status: err?.status || "Server error",
    statusCode: err?.statusCode || 500,
    message: err.message,
  });
};
