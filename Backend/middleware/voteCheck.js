import { MyException } from "../utils/MyException.js";
import { check, query, validationResult } from 'express-validator';


export async function checkIsUpVoteField(req, res, next) {
    await check('isUpVote')
        .exists({ checkFalsy: true }).withMessage('isUpVote field is required')
        .bail()
        .isBoolean().withMessage('isUpVote must be a boolean')
        .toBoolean()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}

export async function checkReviewIdField(req, res, next) {
    await query('reviewId')
        .exists({ checkFalsy: true }).withMessage('reviewId field is required')
        .bail()
        .isInt({ min: 1 }).withMessage('reviewId must be a positive integer')
        .toInt()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}