import { Types } from "mongoose";

export interface IUserNotification {
  userId: Types.ObjectId;
  notificationId: Types.ObjectId;
  isRead: Boolean;
}
