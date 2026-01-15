import { Request, Response } from "express";
import { userServices } from "./user.service";
import { cookiesManagement } from "../../utils/cookiesManagement";
import { responseManager } from "../../utils/responseManager";

const createUser = async (req: Request, res: Response) => {
  try {
    const newCreatedUser = await userServices.createUserService(req.body);
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

export const userController = {
  createUser,
};
