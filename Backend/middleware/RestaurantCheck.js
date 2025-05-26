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

export function checkRestaurantIdField(req, res, next) {
    if (!req.body || !req.body.restaurantId) {
        next(new MyException(MyException.BAD_REQUEST, "RestaurantId field is required"));
    }

    next();
}

export function checkNameField(req, res, next) {
    if (!req.body || !req.body.name) {
        next(new MyException(MyException.BAD_REQUEST, "Name field is required"));
    }
    next();
}

export function checkDescriptionField(req, res, next) {
    if (!req.body || !req.body.description) {
        next(new MyException(MyException.BAD_REQUEST, "Description field is required"));
    }
    next();
}

export function checkTypeField(req, res, next) {
    if (!req.body || !req.body.type) {
        next(new MyException(MyException.BAD_REQUEST, "Type field is required"));
    }
    next();
}

export function checkLatitudeField(req, res, next) {
    if (!req.body || !req.body.latitude) {
        next(new MyException(MyException.BAD_REQUEST, "Latitude field is required"));
    }
    next();
}

export function checkLongitudeField(req, res, next) {
    if (!req.body || !req.body.longitude) {
        next(new MyException(MyException.BAD_REQUEST, "Longitude field is required"));
    }
    next();
}