import { Router } from "express";
import { userController } from "./user.controller";
import { userRole } from "./user.interface";
import { roleBasedProtection } from "../../middleware/roleBasedProtection";
import { userCreateZodSchema } from "./user.validation";
import { validateSchema } from "../../middleware/zodValidate";

export const userRoutes = Router();

userRoutes.post(
  "/register",
  validateSchema(userCreateZodSchema),
  userController.createUser
);

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

// Admin routes
userRoutes.get(
  "/admin/all-users",
  roleBasedProtection(userRole.admin),
  userController.getAllUsers
);
