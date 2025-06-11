import { User } from "../models/Database.js"
import { MyException } from "../utils/MyException.js";
import { check, validationResult } from 'express-validator';

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

export async function checkEmailField(req, res, next) {

    await check('UserEmail')
        .exists({ checkFalsy: true }).withMessage('Email field is required')
        .bail()
        .isEmail().withMessage('Email must be valid')
        .normalizeEmail()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }


    next();
}

export async function checkPasswordField(req, res, next) {
    await check('password')
        .exists({ checkFalsy: true }).withMessage('Password field is required')
        .bail()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .trim()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}

export async function checkNameField(req, res, next) {
    await check('name')
        .exists({ checkFalsy: true }).withMessage('Name field is required')
        .bail()
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
        .trim()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}

export async function checkSurnameField(req, res, next) {
    await check('surname')
        .exists({ checkFalsy: true }).withMessage('Surname field is required')
        .bail()
        .isLength({ min: 2 }).withMessage('Surname must be at least 2 characters')
        .trim()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}