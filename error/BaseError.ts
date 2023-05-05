export default class BaseError extends Error {
  public message = "";
  public status = "Server Error";
  public statusCode = 500;

  constructor(message: string, status: string, statusCode: number) {
    super();

    if (message) this.message = message;
    if (status) this.status = status;
    if (statusCode) this.statusCode = statusCode;
  }
}
