import { logger } from "../../utils/logger";
import { notificationServices } from "./notification.services";
import { INotification } from "./notification.interface";
import { Request, Response } from "express";
import { responseManager } from "../../utils/responseManager";

const createAndSendNotification = async (data: Partial<INotification>) => {
  try {
    const newNotification =
      await notificationServices.createAndSendNotificationService(data);
    return newNotification;
  } catch (error) {
    logger.error(error);
  }
};

const updateNotification = async (data: Partial<INotification>) => {
  try {
    const updatedNotification =
      await notificationServices.updateNotificationService(data);
    return updatedNotification;
  } catch (error) {
    logger.error(error);
  }
};

const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const notifications =
      await notificationServices.getAllNotificationsService();
    console.log(notifications);
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

export const notificationController = {
  createAndSendNotification,
  updateNotification,
  getAllNotifications,
};
