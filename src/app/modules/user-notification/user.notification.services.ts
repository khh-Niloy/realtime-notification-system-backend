import { IUserNotification } from "./user.notification.interface";
import { UserNotification } from "./user.notification.model";

const createUserNotificationService = async (
  data: Partial<IUserNotification>
) => {
  const notification = await UserNotification.create(data);
  return notification;
};

const createManyUserNotificationService = async (
  data: Partial<IUserNotification>[]
) => {
  const notifications = await UserNotification.insertMany(data);
  return notifications;
};

export const userNotificationServices = {
  createUserNotificationService,
  createManyUserNotificationService,
};
