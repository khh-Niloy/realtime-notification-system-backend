import { Router } from "express";
import { authController } from "./auth.controller";
import { userRole } from "../user/user.interface";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";

export const authRoutes = Router();

authRoutes.post("/login", authController.userLogin);

authRoutes.get(
  "/getMe",
  roleBasedProtection(...Object.values(userRole)),
  authController.getMe
);

authRoutes.post("/logout", authController.userLogOut);
