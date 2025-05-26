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
        next(new MyException(404, "Review not found"));
    }

    next();
}

export function checkReviewIdField(req, res, next) {
    if (!req.body || !req.body.reviewId) {
        next(new MyException(400, "reviewId field is required"));
    }

    next();
}


export function checkTitleField(req, res, next) {
    if (!req.body || !req.body.title) {
        next(new MyException(400, "title field is required"));
    }

    next();
}

export function checkContentField(req, res, next) {
    if (!req.body || !req.body.content) {
        next(new MyException(400, "content field is required"));
    }

    next();
}

export function checkOverallRatingField(req, res, next) {
    if (!req.body || !req.body.overallRating) {
        next(new MyException(400, "overallRating field is required"));
    }

    next();
}


export function checkServiceRatingField(req, res, next) {
    if (!req.body || !req.body.serviceRating) {
        next(new MyException(400, "serviceRating field is required"));
    }

    next();
}
export function checkQualityPriceRatingField(req, res, next) {
    if (!req.body || !req.body.qualityPriceRating) {
        next(new MyException(400, "qualityPriceRating field is required"));
    }

    next();
}

export function checkFoodRatingField(req, res, next) {
    if (!req.body || !req.body.foodRating) {
        next(new MyException(400, "foodRating field is required"));
    }

    next();
}

export function checkAtmosphereRatingField(req, res, next) {
    if (!req.body || !req.body.atmosphereRating) {
        next(new MyException(400, "atmosphereRating field is required"));
    }

    next();
}