import { Image, Restaurant } from "../models/Database.js";
import { Op } from 'sequelize';
import { ImageController } from "./ImageController.js";

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

    static async get(where, req, res) {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const offset = (page - 1) * limit;
        const sort = req.query.sort || 'updatedAt';

        const restaurants = await Restaurant.findAll({
            where,
            limit,
            offset,
            order: [
                [sort, 'DESC']
            ]
        });
        return restaurants;

    }

    static async getRestaurants(req, res) {

        const where = {};
        if (req.query.name) {
            where.name = {
                [Op.like]: `%${req.query.name}%`
            };
        }
        if (req.query.userEmail) {
            where.UserEmail = {
                [Op.like]: `%${req.params.userEmail}%`
            };
        }

        return this.get(where, req, res);
    }

    static async getRestaurantsById(req, res) {

        const where = {};
        where.id = req.params.restaurantId;


        return this.get(where, req, res);
    }


    static async deleteRestaurant(req, res) {

        const images = await RestaurantController.extractImages(req);

        const where = {};

        where.id = req.query.restaurantId;
        where.UserEmail = req.email;

        const result = await Restaurant.destroy({
            where
        });

        if (result > 0) {
            RestaurantController.removeAllImages(images);
        }

        return result;

    }

    static removeAllImages(images) {
        images.forEach(element => {
            ImageController.removeFromeCloud(element);
        });
    }

    static async extractImages(req) {
        const where = {};
        where.RestaurantId = req.query.restaurantId;
        const images = await Image.findAll({
            where
        });
        return images;
    }
}