import express from "express";
import { RestaurantController } from "../controllers/RestaurantController.js";
import { MyException } from "../utils/MyException.js";
import { checkNameField, checkDescriptionField, checkLatitudeField, checkLongitudeField, checkTypeField } from "../middleware/RestaurantCheck.js";


export const restaurantRouter = express.Router();

restaurantRouter.post("/addRestaurant", checkNameField, checkDescriptionField, checkTypeField, checkLatitudeField, checkLongitudeField, async(req, res, next) => {
    RestaurantController.saveRestaurant(req, res).then((restaurant) => {
        console.log(restaurant);
        res.json(restaurant);
    }).catch((err) => {
        console.log(err);
        next(new MyException(500, "Could not save restaurant. Try again later."));
    })
});