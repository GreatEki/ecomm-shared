import BaseError from "./BaseError";

export default class NotFoundError extends BaseError {
  constructor(message: string = "Not found error") {
    super(message, "Not Found", 404);
  }
}
