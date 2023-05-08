import BaseError from "./BaseError";

export default class ForbiddenError extends BaseError {
  constructor(message: string = "Forbidden error") {
    super(message, "Forbidden", 403);
  }
}
