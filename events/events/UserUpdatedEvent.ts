import { RoutingKey } from "../routing-keys";
export interface UserUpdatedEvent {
  routingKey: RoutingKey.UserUpdated;
  message: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
  };
}
