import amqp, { Channel } from "amqplib";
import { RoutingKey } from "../routing-keys";

interface Events {
  routingKey: RoutingKey;
  message: any;
}

export abstract class BasePublisher<T extends Events> {
  abstract routingKey: T["routingKey"];

  protected channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async publish(message: T["message"]): Promise<void> {
    const exchangeName = process.env.EXCHANGE_NAME as string;

    await this.channel.assertExchange(exchangeName, "direct");

    this.channel.publish(
      exchangeName,
      this.routingKey,
      Buffer.from(JSON.stringify(message))
    );

    console.log(`${this.routingKey} emitted to exchange ${exchangeName}`);
  }
}
