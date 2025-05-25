import { Review, User } from "../models/Database.js";
import { MyException } from "../utils/MyException.js";

export class ReviewController {

    /**
     * Attempts to create a new User
     */
    static async saveReview(req, res) {
        //save new user
        let review = new Review({
            title: req.body.title,
            content: req.body.content,
            overallRating: req.body.overallRating,
            serviceRating: req.body.serviceRating,
            qualityPriceRating: req.body.qualityPriceRating,
            foodRating: req.body.foodRating,
            atmosphereRating: req.body.atmosphereRating,
            UserEmail: req.email,
            RestaurantId: req.body.restaurantId
        });




        return review.save(); //returns a Promise
    }

    static async getReviewsByRestaurant(req, res) {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const offset = (page - 1) * limit;

        const where = {};
        where.RestaurantId = req.params.restaurantId;

        const sort = req.query.sort || 'updatedAt';

        const reviews = await Review.findAll({
            where,
            limit,
            offset,
            order: [
                [sort, 'DESC']
            ]
        });
        return reviews;
    }

    static async getReviews(req, res) {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const offset = (page - 1) * limit;

        const where = {};
        if (req.query.userEmail) {
            let user = await User.findOne({
                where: {
                    email: req.query.userEmail
                },
            });


            if (user == null) {
                throw new MyException(404, "User not Exists");
            }

            where.UserEmail = req.query.userEmail;
        }

        const sort = req.query.sort || 'updatedAt';

        const reviews = await Review.findAll({
            where,
            limit,
            offset,
            order: [
                [sort, 'DESC']
            ]
        });
        return reviews;
    }


    static async deleteReview(req, res) {
        const where = {};

        const result = await Review.destroy({
            where
        });

        return result;

    }


}