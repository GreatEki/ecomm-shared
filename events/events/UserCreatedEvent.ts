import { RoutingKey } from "../routing-keys";

export interface UserCreatedEvent {
  routingKey: RoutingKey.UserCreated;
  message: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
  };
}
