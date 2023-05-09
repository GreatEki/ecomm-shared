import { RoutingKey } from "../routing-keys";

export interface ProductCreatedEvent {
  routingKey: RoutingKey.ProductCreated;
  message: {
    id: string;
    name: string;
    price: number;
  };
}
