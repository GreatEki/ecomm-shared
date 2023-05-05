"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(message, status, statusCode) {
        super();
        this.message = "";
        this.status = "Server Error";
        this.statusCode = 500;
        if (message)
            this.message = message;
        if (status)
            this.status = status;
        if (statusCode)
            this.statusCode = statusCode;
    }
}
exports.default = BaseError;
