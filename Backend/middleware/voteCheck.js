import { MyException } from "../utils/MyException.js";


export function checkIsUpVoteField(req, res, next) {
    if (!req.body || !req.body.isUpVote) {
        next(new MyException(400, "isUpVote field is required"));
    }

    next();
}

export function checkReviewIdField(req, res, next) {
    if (!req.query || !req.query.reviewId) {
        next(new MyException(400, "reviewId field is required"));
    }

    next();
}