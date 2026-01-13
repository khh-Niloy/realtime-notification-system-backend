import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { userStatus } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import AppError from "../errors/AppError";
import { jwtManagement } from "../utils/jwtManagement";

export const roleBasedProtection =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new AppError(401, "You are not authorized!");
    }

    let userInfoJWTAccessToken: JwtPayload;
    try {
      userInfoJWTAccessToken = jwtManagement.verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(401, "Invalid or expired token!");
    }

    const user = await User.findOne({ email: userInfoJWTAccessToken.email });

    if (!user) {
      throw new AppError(404, "User not found!");
    }

    if (user?.status === userStatus.deleted) {
      throw new AppError(403, "user is deleted!");
    }

    if (user?.status === userStatus.blocked) {
      throw new AppError(403, "user is blocked!");
    }

    if (!roles.includes(userInfoJWTAccessToken.role)) {
      throw new AppError(403, "You are not permitted to view this route!!!");
    }

    req.user = userInfoJWTAccessToken;

    next();
  };
