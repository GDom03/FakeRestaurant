import { Restaurant } from "../models/Database.js"
import { MyException } from "../utils/MyException.js";

export async function checkRestaurantExists(req, res, next) {

    const where = {};

    if (req.body && req.body.restaurantId) {
        where.id = req.body.restaurantId;
    } else if (req.params && req.params.restaurantId) {
        where.id = req.params.restaurantId;
    }

    let restaurant = await Restaurant.findOne({
        where
    });

    if (restaurant == null) {
        next(new MyException(MyException.NOT_FOUND, "Restaurant not found"));
    }

    next();
}

export function checkRestaurantIdIsNumber(req, res, next) {
    if (!Number.isInteger(Number(req.params.restaurantId))) {
        return next(new MyException(MyException.BAD_REQUEST, "Restaurant Id must be an integer"));
    }
    if (Number(req.params.restaurantId) <= 0) {
        return next(new MyException(MyException.BAD_REQUEST, "Restaurant Id must be greater than 0"));
    }


    next();
}

export async function checkRestaurantIdField(req, res, next) {
    await check('restaurantId')
        .exists({ checkFalsy: true }).withMessage('RestaurantId field is required')
        .bail()
        .isUUID().withMessage('RestaurantId must be a valid UUID') // opzionale
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}

export async function checkRestaurantIdParam(req, res, next) {
    await param('restaurantId')
        .exists({ checkFalsy: true }).withMessage('Restaurant Id is required')
        .bail()
        .isInt({ min: 1 }).withMessage('Restaurant Id must be a positive integer')
        .toInt()
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

export async function checkDescriptionField(req, res, next) {
    await check('description')
        .exists({ checkFalsy: true }).withMessage('Description field is required')
        .bail()
        .isLength({ min: 5 }).withMessage('Description must be at least 5 characters')
        .trim()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}

export async function checkTypeField(req, res, next) {
    await check('type')
        .exists({ checkFalsy: true }).withMessage('Type field is required')
        .bail()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}

export async function checkLatitudeField(req, res, next) {
    await check('latitude')
        .exists({ checkFalsy: true }).withMessage('Latitude field is required')
        .bail()
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a number between -90 and 90')
        .toFloat()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}

export async function checkLongitudeField(req, res, next) {
    await check('longitude')
        .exists({ checkFalsy: true }).withMessage('Longitude field is required')
        .bail()
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a number between -180 and 180')
        .toFloat()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}