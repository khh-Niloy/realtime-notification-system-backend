export enum userStatus {
  active = "active",
  blocked = "blocked",
  deleted = "deleted",
}

export enum userRole {
  admin = "admin",
  user = "user",
}

export enum ISubscriptions {
  system = "system",
  task = "task",
  announcement = "announcement",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: userRole;
  status: userStatus;
  subscriptions: ISubscriptions[];
}
