import { MyException } from "../utils/MyException.js";


export function checkImageField(req, res, next) {

    console.log(req.file);
    if (!req.file) {
        return next(new MyException(400, "Image file is required"));
    }
    next();
}