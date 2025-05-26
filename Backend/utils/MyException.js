export class MyException extends Error {

    static UNAUTHORIZED = 401;
    static NOT_FOUND = 404;
    static INTERNAL_SERVER_ERROR = 500;
    static BAD_REQUEST = 400;
    static CONFLICT = 409;

    constructor(status, message = "An error occurred") {
        super(message);
        this.status = status;
    }
}