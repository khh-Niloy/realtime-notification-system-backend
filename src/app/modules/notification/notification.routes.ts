import { Router } from "express";

import { validateSchema } from "../../middleware/zodValidate";
import { notificationController } from "./notification.controller";

export const notificationRoutes = Router();

// Protected routes
// userRoutes.get(
//   "/profile",
//   roleBasedProtection(...Object.values(Roles)),
//   userController.getProfile
// );

// userRoutes.patch(
//   "/profile",
//   roleBasedProtection(...Object.values(Roles)),
//   profileUpload.single('image'),
//   validateSchema(userUpdateZodSchema),
//   userController.updateProfile
// );
