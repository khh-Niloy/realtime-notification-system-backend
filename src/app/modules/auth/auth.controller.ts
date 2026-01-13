import { Request, Response } from "express";
import { authService } from "./auth.service";
import { JwtPayload } from "jsonwebtoken";
import { logger } from "../../utils/logger";
import { cookiesManagement } from "../../utils/cookiesManagement";
import { responseManager } from "../../utils/responseManager";

const userLogin = async (req: Request, res: Response) => {
  try {
    const loggedInUser = await authService.userLoginService(req.body);

    cookiesManagement.setCookie(
      res,
      loggedInUser.accessToken,
      loggedInUser.refreshToken
    );

    responseManager.success(res, {
      statusCode: 200,
      success: true,
      message: "log in successful",
      data: loggedInUser,
    });
  } catch (error) {
    logger.error(error);
    responseManager.error(res, error as Error, 400);
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const payload = req.user;
    const user = await authService.getMeService(payload as JwtPayload);
    responseManager.success(res, {
      statusCode: 200,
      success: true,
      message: "user auth info",
      data: user,
    });
  } catch (error) {
    logger.error(error);
    responseManager.error(res, error as Error, 400);
  }
};

const userLogOut = async (req: Request, res: Response) => {
  try {
    cookiesManagement.clearCookie(res);

    responseManager.success(res, {
      statusCode: 201,
      success: true,
      message: "user log out",
      data: {},
    });
  } catch (error) {
    logger.error(error);
    responseManager.error(res, error as Error, 400);
  }
};

export const authController = {
  userLogin,
  getMe,
  userLogOut,
};
