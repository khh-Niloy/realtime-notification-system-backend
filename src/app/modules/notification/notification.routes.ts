import { notificationController } from "./notification.controller";
import { userRole } from "../user/user.interface";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";
import { Router } from "express";

export const notificationRoutes = Router();

notificationRoutes.get(
  "/",
  roleBasedProtection(...Object.values(userRole)),
  notificationController.getAllNotifications
);
notificationRoutes.get(
  "/:id",
  roleBasedProtection(...Object.values(userRole)),
  notificationController.getNotificationById
);
notificationRoutes.delete(
  "/:id",
  roleBasedProtection(userRole.admin),
  notificationController.deleteNotification
);
