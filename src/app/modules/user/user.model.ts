import { Schema, model } from "mongoose";
import { ISubscriptions, IUser, userRole, userStatus } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(userRole),
      default: userRole.user,
    },
    status: {
      type: String,
      enum: Object.values(userStatus),
      default: userStatus.active,
    },
    subscriptions: [
      {
        type: String,
        enum: Object.values(ISubscriptions),
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
