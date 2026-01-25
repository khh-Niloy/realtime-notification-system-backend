import { Types } from "mongoose";

export enum Category {
  system = "system",
  task = "task",
  announcement = "announcement",
  learning = "learning",
  problem = "problem",
}

export interface INotification {
  _id?: Types.ObjectId;
  title: String;
  message: String;
  category: Category;
  createdAt: Date;
}
