import { Server } from "socket.io";
import { httpServer } from "../../../server";
import { envVars } from "../../config/env";
import { INotification } from "./notification.interface";
import { notificationController } from "./notification.controller";
import { userNotificationController } from "../user-notification/user.notification.controller";
import { User } from "../user/user.model";

export const initWebsocket = (httpServer: any) => {
  const websocketServer = new Server(httpServer, {
    cors: {
      origin: envVars.CORS_FRONTEND_URL,
    },
  });

  websocketServer.on("connect", (socket) => {
    socket.on("register", async (userId: string) => {
      // console.log("register");
      try {
        const user = await User.findById(userId);
        if (user?.subscriptions) {
          user.subscriptions.forEach((category) => {
            socket.join(`category-${category}`);
          });
        }
      } catch (error) {
        console.error("Error registering socket user:", error);
      }
    });

    socket.on("send-notification", async (data: Partial<INotification>) => {
      const newNotification =
        await notificationController.createAndSendNotification(data);

      if (!newNotification) return;

      websocketServer
        .to(`category-${data.category}`)
        .emit("new-notification", newNotification);

      const subscribedUsers = await User.find({
        subscriptions: data.category,
      }).select("_id");

      if (subscribedUsers.length > 0) {
        const userNotificationData = subscribedUsers.map((user) => ({
          userId: user._id,
          notificationId: newNotification._id,
        }));

        await userNotificationController.createManyUserNotification(
          userNotificationData
        );
      }
    });

    socket.on("update-notification", async (data: Partial<INotification>) => {
      const updatedNotification =
        await notificationController.updateNotification(data);

      if (!updatedNotification) return;

      websocketServer
        .to(`category-${updatedNotification.category}`)
        .emit("update-notification", {
          updatedNotification: updatedNotification.toObject(),
          isRead: false,
        });
    });

    socket.on("disconnect", () => {
      // console.log("User disconnected");
    });
  });
};

// {
//   "category-task": ["socket-id-123", "socket-id-456", "socket-id-789"],
//   "category-system": ["socket-id-123", "socket-id-999"],
//   "category-announcement": ["socket-id-456"]
// }
