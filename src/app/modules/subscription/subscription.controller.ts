import { Request, Response } from "express";
import { responseManager } from "../../utils/responseManager";
import { logger } from "../../utils/logger";
import { subscriptionService } from "./subscription.services";

const updateSubscription = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const updatedSubscription = await subscriptionService.subscribeToCategory(
      req.body,
      user._id
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
      await subscriptionService.unsubscribeFromCategory(req.body, user._id);

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

export const subscriptionController = {
  updateSubscription,
  unsubscribe,
};
