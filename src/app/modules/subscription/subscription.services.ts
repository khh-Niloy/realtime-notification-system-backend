import { User } from "../user/user.model";
import { ISubscriptions } from "../user/user.interface";

const subscribeToCategory = async (
  userId: string,
  category: ISubscriptions
) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { subscriptions: category },
    },
    {
      new: true,
      select: "-password",
    }
  );
  return updatedUser;
};

const unsubscribeFromCategory = async (
  userId: string,
  category: ISubscriptions
) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { subscriptions: category },
    },
    {
      new: true,
      select: "-password",
    }
  );
  return updatedUser;
};

const getUserSubscriptions = async (userId: string) => {
  const user = await User.findById(userId).select("subscriptions");
  return user?.subscriptions || [];
};

export const subscriptionService = {
  subscribeToCategory,
  unsubscribeFromCategory,
  getUserSubscriptions,
};
