import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import { IUser, userRole } from "../modules/user/user.interface";

export const seedSuperAdmin = async () => {
  const user = await User.findOne({ email: envVars.ADMIN_EMAIL });

  if (user) {
    return;
  }

  const hashedPassword = await bcryptjs.hash(
    envVars.ADMIN_PASSWORD as string,
    parseInt(envVars.BCRYPT_SALT_ROUND)
  );

  const playLoad: Partial<IUser> = {
    name: "niloy admin",
    email: envVars.ADMIN_EMAIL,
    password: hashedPassword,
    role: userRole.admin,
  };

  await User.create(playLoad);
};
