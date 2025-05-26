import { MyException } from "../utils/MyException.js";
import { Image, Restaurant } from "../models/Database.js";


export function checkImageField(req, res, next) {

    console.log(req.file);
    if (!req.file) {
        return next(new MyException(400, "Image file is required"));
    }
    next();
}

export function checkImageIdField(req, res, next) {

    if (!req.query || !req.query.imageId) {
        return next(new MyException(400, "imageId is required"));
    }
    next();
}


export async function checkImageExists(req, res, next) {
    let image = await Image.findOne({
        where: {
            id: req.query.imageId
        },
    });

    if (image == null) {
        next(new MyException(409, "Image not exists. Try to upload a new one."));
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
        return next(new MyException(401, "You are not authorized to delete this image"));
    }

    next();
}