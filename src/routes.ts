import { Router } from "express";
import { userRoutes } from "./app/modules/user/user.route";
import { authRoutes } from "./app/modules/auth/auth.routes";
import { subscriptionRoutes } from "./app/modules/subscription/subscription.routes";
import { userNotificationRoutes } from "./app/modules/user-notification/user.notification.routes";
import { notificationRoutes } from "./app/modules/notification/notification.routes";

export const routes = Router();

const allRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/subscription",
    route: subscriptionRoutes,
  },
  {
    path: "/user-notification",
    route: userNotificationRoutes,
  },
  {
    path: "/notification",
    route: notificationRoutes,
  },
];

allRoutes.forEach(({ path, route }) => routes.use(path, route));
