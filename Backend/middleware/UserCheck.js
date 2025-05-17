import { User } from "../models/Database.js"
import { MyException } from "../utils/MyException.js";

export async function checkUserExists(req, res, next) {
    let user = await User.findOne({
        where: {
            email: req.body.email
        },
    });

    if (user !== null) {
        next(new MyException(409, "User already registered. Try to login."));
    }
    next();
}