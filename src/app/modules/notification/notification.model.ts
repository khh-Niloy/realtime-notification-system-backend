import { Schema, model } from "mongoose";
import { Category, INotification } from "./notification.interface";

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: Object.values(Category),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Notification = model<INotification>(
  "Notification",
  notificationSchema
);
