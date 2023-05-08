import BaseError from "./BaseError";

export default class PaymentError extends BaseError {
  constructor(message: string = "Payment required") {
    super(message, "Payment required", 402);
  }
}
