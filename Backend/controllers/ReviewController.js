import { Review, User, Vote } from "../models/Database.js";
import { MyException } from "../utils/MyException.js";
import { Sequelize } from "sequelize";

export class ReviewController {

    /**
     * Attempts to create a new User
     */
    static async saveReview(req, res) {
        //save new user
        let review = new Review({
            title: req.locals.title,
            content: req.locals.content,
            overallRating: req.locals.overallRating,
            serviceRating: req.locals.serviceRating,
            qualityPriceRating: req.locals.qualityPriceRating,
            foodRating: req.locals.foodRating,
            atmosphereRating: req.locals.atmosphereRating,
            UserEmail: req.email,
            RestaurantId: req.locals.restaurantId
        });




        return review.save(); //returns a Promise
    }


    static async get(where, req, res) {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;
        const sort = req.query.sort || 'updatedAt';

        const reviews = await Review.findAll({
            where,
            attributes: {
                include: [
                    [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN "Votes"."isUpVote" = TRUE THEN 1 ELSE 0 END`)), 'upvotes'],
                    [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN "Votes"."isUpVote" = FALSE THEN 1 ELSE 0 END`)), 'downvotes']
                ]
            },
            include: [{
                    model: Vote,
                    as: 'Votes',
                    attributes: [],
                    required: false // LEFT OUTER JOIN
                },
                {
                    model: User,
                    as: 'User',
                    attributes: ['name', 'surname'],
                    required: true
                }
            ],
            group: ['Review.id', 'User.email'],
            order: [
                [sort, 'DESC']
            ],
            limit,
            offset,
            subQuery: false
        });

        return reviews;
    }

    static async getReviewsByRestaurant(req, res) {

        const where = {
            RestaurantId: req.locals.restaurantId
        };

        return this.get(where, req, res);
    }

    static async getReviews(req, res) {

        const where = {};
        

        where.UserEmail = req.locals.UserEmail;
        

        return this.get(where, req, res);
    }


    static async deleteReview(req, res) {
        const where = {};
        where.UserEmail = req.email;
        where.id = req.locals.reviewId;

        const result = await Review.destroy({
            where
        });

        return result;

    }


}