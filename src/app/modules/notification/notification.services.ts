import { INotification } from "./notification.interface";
import { Notification } from "./notification.model";

const createAndSendNotificationService = async (
  data: Partial<INotification>
) => {
  const notification = await Notification.create(data);
  return notification;
};

export const notificationServices = {
  createAndSendNotificationService,
};
