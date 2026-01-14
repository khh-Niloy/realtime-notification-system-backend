import { Types } from "mongoose";

export enum Category {
  system = "system",
  task = "task",
  announcement = "announcement",
}

export interface INotification {
  title: String;
  message: String;
  category: Category;
  createdBy: Types.ObjectId;
  createdAt: Date;
}
