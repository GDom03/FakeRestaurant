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
            RestaurantId: req.params.restaurantId
        };

        return this.get(where, req, res);
    }

    static async getReviews(req, res) {

        const where = {};
        if (req.query.userEmail) {
            let user = await User.findOne({
                where: {
                    email: req.query.userEmail
                },
            });


            if (user == null) {
                throw new MyException(MyException.NOT_FOUND, "User not Exists");
            }

            where.UserEmail = req.query.userEmail;
        }

        return this.get(where, req, res);
    }


    static async deleteReview(req, res) {
        const where = {};
        where.UserEmail = req.email;
        where.id = req.query.reviewId;

        const result = await Review.destroy({
            where
        });

        return result;

    }


}