import { Image, Restaurant } from "../models/Database.js";
import { Op } from 'sequelize';
import { ImageController } from "./ImageController.js";

export class RestaurantController {

    static async saveRestaurant(req, res) {


        let restaurant = new Restaurant({
            name: req.locals.name,
            description: req.locals.description,
            type: req.locals.type,
            latitude: req.locals.latitude,
            longitude: req.locals.longitude

        });
        restaurant.UserEmail = req.email;


        return restaurant.save(); 
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
        console.log("Saving restaurant with data: ", req.locals);
        const where = {};
        if (req.locals.name) {
            where.name = {
                [Op.iLike]: `%${req.locals.name}%`
            };
        }
        if (req.locals.UserEmail) {
            where.UserEmail = {
                [Op.iLike]: `%${req.locals.UserEmail}%`
            };
        }

        return this.get(where, req, res);
    }

    static async getRestaurantsById(req, res) {

        const where = {};
        where.id = req.locals.restaurantId;


        return this.get(where, req, res);
    }


    static async deleteRestaurant(req, res) {

        const images = await RestaurantController.extractImages(req);

        const where = {};

        where.id = req.locals.restaurantId;
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
        where.RestaurantId = req.locals.restaurantId;
        const images = await Image.findAll({
            where
        });
        return images;
    }
}