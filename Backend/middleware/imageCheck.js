import { MyException } from "../utils/MyException.js";
import { Image, Restaurant } from "../models/Database.js";
import { check, validationResult } from 'express-validator';

export async function checkImageExists(req, res, next) {
    let image = await Image.findOne({
        where: {
            id: req.query.imageId
        },
    });

    if (image == null) {
        next(new MyException(MyException.NOT_FOUND, "Image not exists. Try to upload a new one."));
    }
    next();
}

export async function checkCanDeleteImage(req, res, next) {
    let image = await Image.findOne({
        where: {
            id: req.query.imageId,
        },
    });

    let restaurant = await Restaurant.findOne({
        where: {
            id: image.RestaurantId,
            UserEmail: req.email
        },
    });

    if (restaurant === null) {
        return next(new MyException(MyException.UNAUTHORIZED, "You are not authorized to delete this image"));
    }

    next();
}

export function checkImageField(req, res, next) {

    if (!req.file) {
        return next(new MyException(MyException.BAD_REQUEST, "Image file is required"));
    }
    next();
}

export async function checkImageIdField(req, res, next) {
    await check('imageId')
        .if((value, { req }) => req.query.imageId || req.body.imageId)
        .exists({ checkFalsy: true }).withMessage('imageId is required')
        .bail()
        .isInt({ min: 1 }).withMessage('imageId must be a valid integer')
        .toInt()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}