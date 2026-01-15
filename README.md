# Realtime Notification System

This project is a backend system built to deliver instant notifications. I wanted to create something that feels responsive where users don't have to refresh their page to see new alerts. Whether it's a system update or a new task assigned to a specific group, the goal was to make sure the right message gets to the right person, the moment it happens.

## Key Features

I focused on providing **Instant Alerts** so updates reach users the millisecond they are triggered. The system uses **Category Subscriptions** so people only get notifications for things they actually care about. I also kept the code **Modular** so it's easy to add new features later, and ensured it is **Secure by Design** with built-in authentication that keeps personal notifications private.

## How it works

### My Approach

I followed the **Modern MVC (Model-View-Controller)** pattern to keep things organized. In this setup, the **Controllers** take in the requests from the user, the **Services** do the actual heavy lifting and business logic, and the **Models** define exactly how the data should be stored in MongoDB. This separation makes the code much easier to debug because you always know exactly where to look when something needs changing.

### Real-time Updates (Live Logic)

The real magic happens with **Socket.IO Rooms and Broadcast**. Instead of sending a message to every single person connected to the server, I used a grouping system based on user interests.

When a user logs in, the client emits a **Register Event**, and the backend looks up that specific user’s subscriptions in the database. I then use **Dynamic Room Creation** to automatically join their socket into a corresponding room like category-sports or category-finance for every category the user follows. This allows for **Instant Broadcasting** so when an admin creates a new notification, the server doesn't have to search for users; it just tells that category's room to broadcast the message, making the delivery instant and extremely efficient.

### 🛠️ Tech Stack

| Technology             | Why I used it                                                                 |
| :--------------------- | :---------------------------------------------------------------------------- |
| **Node.js & Express**  | The core engine. It's fast and handles multiple connections easily.           |
| **TypeScript**         | For keeping the code clean and catching mistakes while writing.               |
| **MongoDB & Mongoose** | To store user profiles and keep a history of every notification sent.         |
| **Socket.IO**          | This handles the actual real-time connection between the user and the server. |
| **Zod**                | It acts as a gatekeeper to make sure no "bad" data enters the system.         |
| **JWT**                | Simple and secure way to keep track of who is logged in.                      |

### 📂 Project Structure

```text
src/
├── app/
│   ├── config/
│   │   └── env.ts              # Handling secret keys and ports
│   ├── errors/
│   │   └── AppError.ts         # Central way to handle mistakes
│   ├── interface/
│   │   └── index.d.ts          # Shared types across the app
│   ├── lib/
│   │   └── connectMongoose.ts  # Database connection logic
│   ├── middleware/
│   │   ├── auth.ts             # Checking if a user is logged in
│   │   ├── globalErrorHandler.ts # Catching crashes gracefully
│   │   └── zodValidate.ts      # Data validation checkpoint
│   ├── modules/                # Where the actual features live
│   │   ├── auth/               # Login and Registration
│   │   ├── notification/       # Core logic for creating/sending alerts
│   │   ├── subscription/       # Managing what users want to follow
│   │   ├── user/               # User profiles and roles
│   │   └── user-notification/  # Saving history for specific users
│   └── utils/
│       ├── jwtManagement.ts    # Token generation and verification
│       ├── logger.ts           # Keeping track of server activity
│       └── responseManager.ts  # Standard way to send data back
├── routes.ts                   # The main entry for all API paths
├── app.ts                      # Configuring Express and Middlewares
└── server.ts                   # Where the server and WebSockets start
```

## A bit more about the project

When building this backend, I made specific choices to keep the notification flow as smooth as possible. For the live feed, I prioritized sending the data out to active sockets as quickly as possible. This makes the system feel incredibly snappy on the frontend, as updates appear without any noticeable delay.

I prioritize saving to the database before the notification is sent which means there is a tiny delay, but it ensures that even if a user's internet cuts out the notification is still saved for later

for Room Management, I assume users are grouped by categories, but if I wanted to target just one specific person I would just treat their unique User ID as a private room.

Regarding the data side, the backend acts as the single source of truth. If a user is offline or misses a live update, the backend ensures every notification is safely stored and linked to their account. The moment they log back in or refresh their feed, the system serves them a fresh, clean list from the database, making sure their history is perfectly in line with what actually happened while they were away.
