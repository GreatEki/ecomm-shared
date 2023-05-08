import BaseError from "./BaseError";

export default class BadRequestError extends BaseError {
  constructor(message: string = "Bad Request error") {
    super(message, "Bad Request", 400);
  }
}
