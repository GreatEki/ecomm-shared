import amqp, { Channel } from "amqplib";
import { RoutingKey } from "../routing-keys";

interface Events {
  routingKey: RoutingKey;
  message: any;
}

export abstract class BasePublisher<T extends Events> {
  abstract routingKey: T["routingKey"];

  protected channel: Channel;

  async createChannel() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL!);

    this.channel = await connection.createChannel();
  }

  async publish(data: T["message"]): Promise<void> {
    if (!this.channel) {
      this.createChannel();
    }

    const exchangeName = process.env.EXCHANGE_NAME as string;

    await this.channel.assertExchange(exchangeName, "direct");

    this.channel.publish(
      exchangeName,
      this.routingKey,
      Buffer.from(JSON.stringify(data))
    );

    console.log(`${this.routingKey} emitted to exchange ${exchangeName}`);
  }
}