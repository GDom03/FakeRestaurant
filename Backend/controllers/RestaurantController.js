import { Restaurant } from "../models/Database.js";
import { Op } from 'sequelize';

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

    static async getRestaurants(req, res) {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const offset = (page - 1) * limit;

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

    static async getRestaurantsById(req, res) {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const offset = (page - 1) * limit;

        const where = {};
        where.id = req.params.restaurantId;

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


    static async deleteRestaurant(req, res) {
        const where = {};

        where.id = req.query.restaurantId;
        where.UserEmail = req.email;

        const result = await Restaurant.destroy({
            where
        });

        return result;

    }


}