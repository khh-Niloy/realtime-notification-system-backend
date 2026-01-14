import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";
import { userRole } from "../user/user.interface";

export const subscriptionRoutes = Router();

subscriptionRoutes.patch(
  "/subscribe",
  roleBasedProtection(...Object.values(userRole)),
  subscriptionController.updateSubscription
);
subscriptionRoutes.patch(
  "/unsubscribe",
  roleBasedProtection(...Object.values(userRole)),
  subscriptionController.unsubscribe
);
