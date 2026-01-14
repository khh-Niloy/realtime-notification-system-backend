import { logger } from "../../utils/logger";
import { userNotificationServices } from "./user.notification.services";
import { IUserNotification } from "./user.notification.interface";

const createUserNotification = async (data: Partial<IUserNotification>) => {
  try {
    const newUserNotification =
      await userNotificationServices.createUserNotificationService(data);
    return newUserNotification;
  } catch (error) {
    logger.error(error);
  }
};

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

export const userNotificationController = {
  createUserNotification,
  createManyUserNotification,
};
