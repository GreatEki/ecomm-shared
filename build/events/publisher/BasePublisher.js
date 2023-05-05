"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePublisher = void 0;
class BasePublisher {
    constructor(channel) {
        this.channel = channel;
    }
    publish(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const exchangeName = process.env.EXCHANGE_NAME;
            yield this.channel.assertExchange(exchangeName, "direct");
            this.channel.publish(exchangeName, this.routingKey, Buffer.from(JSON.stringify(message)));
            console.log(`${this.routingKey} emitted to exchange ${exchangeName}`);
        });
    }
}
exports.BasePublisher = BasePublisher;
