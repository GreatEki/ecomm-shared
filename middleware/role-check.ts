import { Request, Response, NextFunction } from "express";
import prisma from "../../product/config/prisma-client";
import { ForbiddenError } from "../error";
import { UserType } from "../constants";

export const adminGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: req.currentUser!.id },
    });

    if (!user?.userType.includes(UserType.ADMIN))
      throw new ForbiddenError(
        "You are not permtted to perform this operation"
      );
  } catch (err) {
    next(err);
  }

  next();
};
