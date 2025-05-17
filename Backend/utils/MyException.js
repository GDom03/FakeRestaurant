export class MyException extends Error {

    constructor(status, message = "An error occurred") {
        super(message);
        this.status = status;
    }
}