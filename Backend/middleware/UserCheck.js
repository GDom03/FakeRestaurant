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

export function checkEmailField(req, res, next) {
    if (!req.body || !req.body.email) {
        next(new MyException(400, "Email field is required"));
    }
    next();
}

export function checkPasswordField(req, res, next) {
    if (!req.body || !req.body.password) {
        next(new MyException(400, "Password field is required"));
    }
    next();
}

export function checkNameField(req, res, next) {
    if (!req.body || !req.body.name) {
        next(new MyException(400, "Name field is required"));
    }
    next();
}

export function checkSurnameField(req, res, next) {
    if (!req.body || !req.body.surname) {
        next(new MyException(400, "Surname field is required"));
    }
    next();
}