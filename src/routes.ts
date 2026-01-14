import { Router } from "express";
import { userRoutes } from "./app/modules/user/user.route";
import { authRoutes } from "./app/modules/auth/auth.routes";
import { subscriptionRoutes } from "./app/modules/subscription/subscription.routes";

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
];

allRoutes.forEach(({ path, route }) => routes.use(path, route));
