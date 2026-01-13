import bcryptjs from "bcryptjs";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { JwtPayload } from "jsonwebtoken";
import { jwtManagement } from "../../utils/jwtManagement";

const userLoginService = async (playLoad: Partial<IUser>) => {
  const { email, password } = playLoad;

  const userEmail = email?.toLowerCase().trim();

  const user = await User.findOne({ email: userEmail }).select("+password");

  if (!user) {
    throw new Error("Please register first");
  }

  const checkPassword = await bcryptjs.compare(
    password as string,
    user.password as string
  );
  if (!checkPassword) {
    throw new Error("password did not match!");
  }

  // Get user without password for response
  const userWithoutPassword = await User.findById(user._id);

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const { accessToken, refreshToken } =
    jwtManagement.createAccessAndRefreshToken(jwtPayload);

  return { accessToken, refreshToken, user: userWithoutPassword };
};

const getMeService = async (payload: JwtPayload) => {
  const user = await User.findById(payload.userId).select(
    "_id name email role phone address image"
  );
  return user;
};

export const authService = {
  userLoginService,
  getMeService,
};
