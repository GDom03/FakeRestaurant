import { User } from "../models/Database.js"
import { MyException } from "../utils/MyException.js";

export async function checkUserExists(req, res, next) {

    const where = {};

    where.email = req.query.UserEmail;

    let user = await User.findOne({
        where
    });

    if (user == null) {
        next(new MyException(MyException.BAD_REQUEST, "User not Exists"));
    }
    next();
}

export async function checkUserNotExists(req, res, next) {

    const where = {};

    where.email = req.body.UserEmail;

    let user = await User.findOne({
        where
    });

    if (user !== null) {
        next(new MyException(MyException.BAD_REQUEST, "User already registered. Try to login."));
    }
    next();
}

export function checkEmailField(req, res, next) {
    if (req.query && req.query.UserEmail) {
        next();
        return;
    } else if (req.body && req.body.UserEmail) {
        next();
        return;
    }

    next(new MyException(MyException.BAD_REQUEST, "Email field is required"));

}

export function checkPasswordField(req, res, next) {
    if (!req.body || !req.body.password) {
        next(new MyException(MyException.BAD_REQUEST, "Password field is required"));
    }
    next();
}

export function checkNameField(req, res, next) {
    if (!req.body || !req.body.name) {
        next(new MyException(MyException.BAD_REQUEST, "Name field is required"));
    }
    next();
}

export function checkSurnameField(req, res, next) {
    if (!req.body || !req.body.surname) {
        next(new MyException(MyException.BAD_REQUEST, "Surname field is required"));
    }
    next();
}