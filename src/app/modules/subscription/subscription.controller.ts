import { Request, Response } from "express";
import { responseManager } from "../../utils/responseManager";
import { logger } from "../../utils/logger";
import { subscriptionService } from "./subscription.services";

const updateSubscription = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    console.log(user);
    const updatedSubscription = await subscriptionService.subscribeToCategory(
      user.userId,
      req.body.category
    );

    responseManager.success(res, {
      statusCode: 200,
      success: true,
      message: "Subscription updated successfully",
      data: updatedSubscription,
    });
  } catch (error) {
    logger.error(error);
    responseManager.error(res, error as Error, 400);
  }
};

const unsubscribe = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const updatedSubscription =
      await subscriptionService.unsubscribeFromCategory(
        user.userId,
        req.body.category
      );

    responseManager.success(res, {
      statusCode: 200,
      success: true,
      message: "Subscription updated successfully",
      data: updatedSubscription,
    });
  } catch (error) {
    logger.error(error);
    responseManager.error(res, error as Error, 400);
  }
};

const getUserSubscriptions = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const subscriptions = await subscriptionService.getUserSubscriptions(
      user.userId
    );

    responseManager.success(res, {
      statusCode: 200,
      success: true,
      message: "Subscriptions fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    logger.error(error);
    responseManager.error(res, error as Error, 400);
  }
};

export const subscriptionController = {
  updateSubscription,
  unsubscribe,
  getUserSubscriptions,
};
