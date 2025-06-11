import { MyException } from "../utils/MyException.js";
import { Image, Restaurant } from "../models/Database.js";

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

export async function checkRestaurantIdField(req, res, next) {
    await check('restaurantId')
        .exists({ checkFalsy: true }).withMessage('RestaurantId field is required')
        .bail()
        .isInt({ gt: 0 }).withMessage('RestaurantId must be a positive integer')
        .toInt()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new MyException(MyException.BAD_REQUEST, errors.array()[0].msg));
    }

    next();
}