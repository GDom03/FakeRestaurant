import { User } from "../models/Database.js"
import { MyException } from "../utils/MyException.js";
import { check, validationResult } from 'express-validator';

export async function checkUserExists(req, res, next) {

    const where = {};

    where.email = req.locals.UserEmail;

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

    where.email = req.locals.UserEmail;

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

    // Salva il valore validato in un campo locale di `req`
    req.locals = req.locals || {}; // inizializza se necessario
    req.locals.UserEmail = req.body?.UserEmail || req.query?.UserEmail || req.params?.UserEmail;


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


    // Salva il valore validato in un campo locale di `req`
    req.locals = req.locals || {}; // inizializza se necessario
    req.locals.password = req.body?.password || req.query?.password || req.params?.password;

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

    // Salva il valore validato in un campo locale di `req`
    req.locals = req.locals || {}; // inizializza se necessario
    req.locals.name = req.body?.name || req.query?.name || req.params?.name;

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

    // Salva il valore validato in un campo locale di `req`
    req.locals = req.locals || {}; // inizializza se necessario
    req.locals.surname = req.body?.surname || req.query?.surname || req.params?.surname;

    next();
}