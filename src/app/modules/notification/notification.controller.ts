import { logger } from "../../utils/logger";
import { notificationServices } from "./notification.services";
import { INotification } from "./notification.interface";

const createAndSendNotification = async (data: Partial<INotification>) => {
  try {
    const newNotification =
      await notificationServices.createAndSendNotificationService(data);
    return newNotification;
  } catch (error) {
    logger.error(error);
  }
};

export const notificationController = {
  createAndSendNotification,
};
