import { model, Schema } from "mongoose";
import { IUserNotification } from "./user.notification.interface";

const userNotificationSchema = new Schema<IUserNotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notificationId: {
      type: Schema.Types.ObjectId,
      ref: "Notification",
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserNotification = model<IUserNotification>(
  "UserNotification",
  userNotificationSchema
);
