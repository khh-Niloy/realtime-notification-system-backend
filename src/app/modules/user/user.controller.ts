import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import { cookiesManagement } from "../../utils/cookiesManagement";
import { responseManager } from "../../utils/responseManager";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = { ...req.body };

    const newCreatedUser = await userServices.createUserService(userData);
    cookiesManagement.setCookie(
      res,
      newCreatedUser.accessToken,
      newCreatedUser.refreshToken
    );

    responseManager.success(res, {
      statusCode: 201,
      success: true,
      message: "User created successfully",
      data: newCreatedUser,
    });
  } catch (err) {
    console.log(err);
    responseManager.error(res, err as Error, 500);
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const userInfo = req.user;
    const profile = await userServices.getProfileService(
      userInfo as JwtPayload
    );

    responseManager.success(res, {
      statusCode: 200,
      success: true,
      message: "my info",
      data: profile,
    });
  } catch (error) {
    console.log(error);
    responseManager.error(res, error as Error, 500);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsersService();

    responseManager.success(res, {
      statusCode: 200,
      success: true,
      message: "All users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    responseManager.error(res, error as Error, 500);
  }
};

export const userController = {
  createUser,
  getProfile,
  getAllUsers,
};
