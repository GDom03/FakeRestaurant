import e from "express";
import { Restaurant } from "../models/Database.js"
import { MyException } from "../utils/MyException.js";


export function checkNameField(req, res, next) {
    if (!req.body.name) {
        next(new MyException(400, "Name field is required"));
    }
    next();
}

export function checkDescriptionField(req, res, next) {
    if (!req.body.description) {
        next(new MyException(400, "Description field is required"));
    }
    next();
}

export function checkTypeField(req, res, next) {
    if (!req.body.type) {
        next(new MyException(400, "Type field is required"));
    }
    next();
}

export function checkLatitudeField(req, res, next) {
    if (!req.body.latitude) {
        next(new MyException(400, "Latitude field is required"));
    }
    next();
}

export function checkLongitudeField(req, res, next) {
    if (!req.body.longitude) {
        next(new MyException(400, "Longitude field is required"));
    }
    next();
}