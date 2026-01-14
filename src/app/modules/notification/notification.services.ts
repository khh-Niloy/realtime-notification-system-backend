import { UserNotification } from "../user-notification/user.notification.model";
import { INotification } from "./notification.interface";
import { Notification } from "./notification.model";

const createAndSendNotificationService = async (
  data: Partial<INotification>
) => {
  const notification = await Notification.create(data);
  return notification;
};

const updateNotificationService = async (data: Partial<INotification>) => {
  const notification = await Notification.findByIdAndUpdate(data._id, data, {
    new: true,
  });
  await UserNotification.updateMany(
    { notificationId: data._id },
    { isRead: false }
  );
  return notification;
};

const getAllNotificationsService = async () => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  return notifications;
};

export const notificationServices = {
  createAndSendNotificationService,
  updateNotificationService,
  getAllNotificationsService,
};
