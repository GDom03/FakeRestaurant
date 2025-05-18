export class SuccessMessage {

    constructor(status = 200, message = "ok") {
        this.status = status;
        this.message = message;
    }

    toString() {
        return JSON.stringify(this);
    }


}