import { IUserNotification } from "./user.notification.interface";
import { UserNotification } from "./user.notification.model";

const createManyUserNotificationService = async (
  data: Partial<IUserNotification>[]
) => {
  const notifications = await UserNotification.insertMany(data);
  return notifications;
};

const getUserNotificationsService = async (user: any) => {
  const notifications = await UserNotification.find({
    userId: user.userId,
  })
    .populate("notificationId")
    .sort({ createdAt: -1 });
  console.log(notifications);
  return notifications;
};

const markAsReadService = async (id: string) => {
  const result = await UserNotification.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );
  return result;
};

export const userNotificationServices = {
  createManyUserNotificationService,
  getUserNotificationsService,
  markAsReadService,
};
