import { User, Restaurant, Review } from "../models/Database.js";
import Jwt from "jsonwebtoken";


export class RestaurantController {

    /**
     * Attempts to create a new User
     */
    static async saveRestaurant(req, res) {
        //save new user
        let restaurant = new Restaurant({
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            latitude: req.body.latitude,
            longitude: req.body.longitude

        });
        restaurant.UserEmail = req.email;


        return restaurant.save(); //returns a Promise
    }


}