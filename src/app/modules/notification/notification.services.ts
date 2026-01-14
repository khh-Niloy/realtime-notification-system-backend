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

const getNotificationByIdService = async (id: string) => {
  const result = await Notification.findById(id);
  return result;
};

const getAllNotificationsService = async () => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  return notifications;
};

const deleteNotificationService = async (id: string) => {
  const result = await Notification.findByIdAndDelete(id);
  await UserNotification.deleteMany({ notificationId: id });
  return result;
};

export const notificationServices = {
  createAndSendNotificationService,
  updateNotificationService,
  getAllNotificationsService,
  getNotificationByIdService,
  deleteNotificationService,
};
