import { logger } from "../../utils/logger";
import { userNotificationServices } from "./user.notification.services";
import { IUserNotification } from "./user.notification.interface";
import { Request, Response } from "express";
import { responseManager } from "../../utils/responseManager";

const createManyUserNotification = async (
  data: Partial<IUserNotification>[]
) => {
  try {
    const newUserNotifications =
      await userNotificationServices.createManyUserNotificationService(data);
    return newUserNotifications;
  } catch (error) {
    logger.error(error);
  }
};

const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const notifications =
      await userNotificationServices.getUserNotificationsService(user);
    return responseManager.success(res, {
      statusCode: 200,
      success: true,
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (error: any) {
    logger.error(error);
    return responseManager.error(res, error, error.statusCode || 500);
  }
};

const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userNotificationServices.markAsReadService(
      id as string
    );
    return responseManager.success(res, {
      statusCode: 200,
      success: true,
      message: "Notification marked as read",
      data: result,
    });
  } catch (error: any) {
    logger.error(error);
    return responseManager.error(res, error, error.statusCode || 500);
  }
};

export const userNotificationController = {
  createManyUserNotification,
  getUserNotifications,
  markAsRead,
};
