import { Review, User } from "../models/Database.js"
import { MyException } from "../utils/MyException.js";

export async function checkReviewExists(req, res, next) {

    let review = await Review.findOne({
        where: {
            id: req.query.reviewId,
            UserEmail: req.email
        },
    });

    if (review == null) {
        next(new MyException(MyException.NOT_FOUND, "Review not found"));
    }

    next();
}

export async function checkReviewIdField(req, res, next) {
    await check('reviewId')
        .exists({ checkFalsy: true }).withMessage('reviewId field is required')
        .bail()
        .isInt({ min: 1 }).withMessage('reviewId must be a positive integer')
        .toInt()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}


export async function checkTitleField(req, res, next) {
    await check('title')
        .exists({ checkFalsy: true }).withMessage('title field is required')
        .bail()
        .isLength({ min: 3 }).withMessage('title must be at least 3 characters')
        .trim()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}


export async function checkContentField(req, res, next) {
    await check('content')
        .exists({ checkFalsy: true }).withMessage('content field is required')
        .bail()
        .isLength({ min: 10 }).withMessage('content must be at least 10 characters')
        .trim()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}


export async function checkOverallRatingField(req, res, next) {
    await check('overallRating')
        .exists({ checkFalsy: true }).withMessage('overallRating field is required')
        .bail()
        .isFloat({ min: 1, max: 5 }).withMessage('overallRating must be between 1 and 5')
        .toFloat()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}


export async function checkServiceRatingField(req, res, next) {
    await check('serviceRating')
        .exists({ checkFalsy: true }).withMessage('serviceRating field is required')
        .bail()
        .isFloat({ min: 1, max: 5 }).withMessage('serviceRating must be between 1 and 5')
        .toFloat()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}

export async function checkQualityPriceRatingField(req, res, next) {
    await check('qualityPriceRating')
        .exists({ checkFalsy: true }).withMessage('qualityPriceRating field is required')
        .bail()
        .isFloat({ min: 1, max: 5 }).withMessage('qualityPriceRating must be between 1 and 5')
        .toFloat()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}


export async function checkFoodRatingField(req, res, next) {
    await check('foodRating')
        .exists({ checkFalsy: true }).withMessage('foodRating field is required')
        .bail()
        .isFloat({ min: 1, max: 5 }).withMessage('foodRating must be between 1 and 5')
        .toFloat()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}

export async function checkAtmosphereRatingField(req, res, next) {
    await check('atmosphereRating')
        .exists({ checkFalsy: true }).withMessage('atmosphereRating field is required')
        .bail()
        .isFloat({ min: 1, max: 5 }).withMessage('atmosphereRating must be between 1 and 5')
        .toFloat()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}