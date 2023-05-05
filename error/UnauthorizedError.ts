import BaseError from "./BaseError";

export default class UnauthorizedError extends BaseError {
  constructor(message: string = "Authorization Failure") {
    super(message, "Unauthorized", 401);
  }
}
