export class SuccessMessage {

    static OK = new SuccessMessage(200, "ok");

    constructor(status = 200, message = "ok") {
        this.status = status;
        this.message = message;
    }

    toString() {
        return JSON.stringify(this);
    }


}