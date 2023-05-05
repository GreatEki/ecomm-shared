import { Channel, ConsumeMessage } from "amqplib";
import { RoutingKey } from "../routing-keys";

interface Events {
  routingKey: RoutingKey;
  message: any;
}

export abstract class BaseListener<T extends Events> {
  abstract routingKey: T["routingKey"];
  abstract QueueName: string;
  abstract onMessage(data: T["message"], msg: ConsumeMessage): void;

  protected channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async subscribe() {
    const exchangeName = process.env.EXCHANGE_NAME as string;
    await this.channel.assertExchange(exchangeName, "direct");

    const serviceQueue = await this.channel.assertQueue(this.QueueName);

    await this.channel.bindQueue(
      serviceQueue.queue,
      exchangeName,
      this.routingKey
    );

    this.channel.consume(serviceQueue.queue, (msg) => {
      if (!msg) throw new Error("Empty message received");

      console.log(
        `Message ${this.routingKey} received at ${serviceQueue.queue} `
      );
      this.onMessage(this.parseMessage(msg), msg);
    });
  }

  parseMessage(msg: ConsumeMessage) {
    const data = msg.content;
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
