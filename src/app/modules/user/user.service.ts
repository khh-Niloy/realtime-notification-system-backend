import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { IUser, userRole } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";
import { jwtManagement } from "../../utils/jwtManagement";
import AppError from "../../errors/AppError";

const createUserService = async (playLoad: Partial<IUser>) => {
  const { email, password, ...rest } = playLoad;

  const userEmail = email?.toLowerCase().trim();

  const isUserExist = await User.findOne({ email: userEmail });
  if (isUserExist) {
    throw new AppError(400, "User already exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    parseInt(envVars.BCRYPT_SALT_ROUND)
  );

  const userData = {
    email: userEmail,
    password: hashedPassword,
    ...rest,
  };

  const newCreatedUser = await User.create(userData);

  const jwtPayload = {
    userId: newCreatedUser._id,
    email: newCreatedUser.email,
    role: newCreatedUser.role,
  };

  const { accessToken, refreshToken } =
    jwtManagement.createAccessAndRefreshToken(jwtPayload);

  return { accessToken, refreshToken, user: newCreatedUser };
};

export const userServices = {
  createUserService,
};
