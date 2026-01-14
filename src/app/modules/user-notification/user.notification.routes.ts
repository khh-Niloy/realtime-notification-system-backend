import { Router } from "express";
import { userNotificationController } from "./user.notification.controller";
import { userRole } from "../user/user.interface";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";

export const userNotificationRoutes = Router();

userNotificationRoutes.get(
  "/",
  roleBasedProtection(...Object.values(userRole)),
  userNotificationController.getUserNotifications
);
userNotificationRoutes.patch(
  "/:id",
  roleBasedProtection(...Object.values(userRole)),
  userNotificationController.markAsRead
);
