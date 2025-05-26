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

export function checkReviewIdField(req, res, next) {
    if (!req.body || !req.body.reviewId) {
        next(new MyException(MyException.BAD_REQUEST, "reviewId field is required"));
    }

    next();
}


export function checkTitleField(req, res, next) {
    if (!req.body || !req.body.title) {
        next(new MyException(MyException.BAD_REQUEST, "title field is required"));
    }

    next();
}

export function checkContentField(req, res, next) {
    if (!req.body || !req.body.content) {
        next(new MyException(MyException.BAD_REQUEST, "content field is required"));
    }

    next();
}

export function checkOverallRatingField(req, res, next) {
    if (!req.body || !req.body.overallRating) {
        next(new MyException(MyException.BAD_REQUEST, "overallRating field is required"));
    }

    next();
}


export function checkServiceRatingField(req, res, next) {
    if (!req.body || !req.body.serviceRating) {
        next(new MyException(MyException.BAD_REQUEST, "serviceRating field is required"));
    }

    next();
}
export function checkQualityPriceRatingField(req, res, next) {
    if (!req.body || !req.body.qualityPriceRating) {
        next(new MyException(MyException.BAD_REQUEST, "qualityPriceRating field is required"));
    }

    next();
}

export function checkFoodRatingField(req, res, next) {
    if (!req.body || !req.body.foodRating) {
        next(new MyException(MyException.BAD_REQUEST, "foodRating field is required"));
    }

    next();
}

export function checkAtmosphereRatingField(req, res, next) {
    if (!req.body || !req.body.atmosphereRating) {
        next(new MyException(MyException.BAD_REQUEST, "atmosphereRating field is required"));
    }

    next();
}