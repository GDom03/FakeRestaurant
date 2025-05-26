import express from "express";

import { MyException } from "../utils/MyException.js";
import { RestaurantController } from "../controllers/RestaurantController.js";
import { ReviewController } from "../controllers/ReviewController.js";

export const searchRouter = express.Router();

/**
 * @swagger
 * /getRestaurants:
 *   get:
 *     summary: Search for restaurants
 *     description: Retrieve a list of restaurants filtered by name or associated user email and you can sort them, also it has a page system.
 *     tags:
 *       - Search Resources
 *     parameters:
 *       - in: query
 *         name: nameRestaurant
 *         schema:
 *           type: string
 *         description: Partial or full name of the restaurant to search for
 *       - in: query
 *         name: emailUser
 *         schema:
 *           type: string
 *           format: email
 *         description: Email of the user associated with the restaurant
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number for paginated results
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Limit number for paginated results
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: updatedAt
 *         required: false
 *         description: Field to sort the results by (e.g. 'type', 'name', 'updatedAt')
 *     responses:
 *       '200':
 *         description: List of restaurants matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       '400':
 *         description: No search parameters provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: No search parameters provided
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Could not fetch restaurants. Try again later.
 */
searchRouter.get("/getRestaurants", async(req, res, next) => {

    try {
        const restaurants = await RestaurantController.getRestaurants(req, res);
        res.json(restaurants);
    } catch (err) {
        console.log(err);
        next(new MyException(500, "Could not fetch restaurants. Try again later."));
    }

});

/**
 * @swagger
 * /getRestaurants/{restaurantId}:
 *   get:
 *     summary: Get a restaurant by ID
 *     description: Retrieve a single restaurant using its unique numeric ID.
 *     tags:
 *       - Search Resources
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the restaurant to retrieve
 *     responses:
 *       '200':
 *         description: The restaurant was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       '400':
 *         description: Invalid restaurant ID (must be an integer)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Restaurant Id must be an integer
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Could not fetch restaurants. Try again later.
 */
searchRouter.get("/getRestaurants/:restaurantId", async(req, res, next) => {
    if (!Number.isInteger(Number(req.params.restaurantId))) {
        return next(new MyException(400, "Restaurant Id must be an integer"));
    }

    try {
        const restaurants = await RestaurantController.getRestaurantsById(req, res);
        res.json(restaurants);
    } catch (err) {
        console.log(err);
        next(new MyException(500, "Could not fetch restaurants. Try again later."));
    }
});

/**
 * @swagger
 * /getReviews:
 *   get:
 *     summary: Get reviews by restaurant
 *     description: Retrieve a paginated list of reviews for a specific restaurant, including upvotes and downvotes counts. Supports sorting.
 *     tags:
 *       - Search Resources
 *     parameters:
 *       - in: query
 *         name: restaurantId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the restaurant to get reviews for
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number for paginated results
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of reviews per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: updatedAt
 *         required: false
 *         description: Field to sort the results by (e.g. 'updatedAt', 'overallRating')
 *     responses:
 *       '200':
 *         description: List of reviews for the restaurant with upvotes and downvotes counts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '400':
 *         description: Missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Missing restaurantId parameter
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Could not fetch reviews. Try again later.
 */
searchRouter.get("/getReviews", async(req, res, next) => {

    try {
        const reviews = await ReviewController.getReviews(req, res);
        res.json(reviews);
    } catch (err) {
        console.log(err);
        if (err instanceof MyException) {
            next(err);
        }
        next(new MyException(500, "Could not fetch reviews. Try again later."));
    }

});

/**
 * @swagger
 * /getReviews/{restaurantId}:
 *   get:
 *     summary: Get reviews by restaurant ID
 *     description: Retrieve all reviews associated with a specific restaurant using its unique numeric ID.
 *     tags:
 *       - Search Resources
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the restaurant to retrieve reviews for
 *     responses:
 *       '200':
 *         description: The reviews were successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '400':
 *         description: Invalid restaurant ID (must be an integer)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Restaurant Id must be an integer
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Could not fetch reviews. Try again later.
 */
searchRouter.get("/getReviews/:restaurantId", async(req, res, next) => {

    if (!Number.isInteger(Number(req.params.restaurantId))) {
        return next(new MyException(400, "Restaurant Id must be an integer"));
    }

    try {
        const reviews = await ReviewController.getReviewsByRestaurant(req, res);
        res.json(reviews);
    } catch (err) {
        console.log(err);
        next(new MyException(500, "Could not fetch reviews. Try again later."));
    }

});