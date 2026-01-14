import { Server } from "socket.io";
import { httpServer } from "../../../server";
import { envVars } from "../../config/env";
import { INotification } from "./notification.interface";
import { notificationController } from "./notification.controller";
import { userNotificationController } from "../user-notification/user.notification.controller";
import { User } from "../user/user.model";

const websocketServer = new Server(httpServer, {
  cors: {
    origin: envVars.CORS_FRONTEND_URL,
  },
});

websocketServer.on("connection", (socket) => {
  socket.on("send-notification", async (data: Partial<INotification>) => {
    const newNotification =
      await notificationController.createAndSendNotification(data);

    const subscribedUsers = await User.find({
      subscriptions: data.category,
    });

    subscribedUsers.forEach(async (user) => {
      if (newNotification) {
        await userNotificationController.createUserNotification({
          userId: user._id,
          notificationId: newNotification._id,
        });
      }
      socket.to(user._id.toString()).emit("new-notification", newNotification);
    });
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
