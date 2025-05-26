import express from "express";
import { ReviewController } from "../controllers/ReviewController.js";
import { MyException } from "../utils/MyException.js";
import { checkTitleField, checkContentField, checkOverallRatingField, checkServiceRatingField, checkQualityPriceRatingField, checkFoodRatingField, checkAtmosphereRatingField } from "../middleware/reviewCheck.js";
import { checkRestaurantIdField, checkRestaurantExists } from "../middleware/restaurantCheck.js";


export const reviewRouter = express.Router();

/**
 * @swagger
 * /addReview:
 *   post:
 *     summary: Create a new review
 *     description: Create a new restaurant review with the given data
 *     tags:
 *       - Insert Resources
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Review data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *           example:
 *             title: "Strange waiters"
 *             content: "While I was eating, the waiter stood there the whole time looking at me near the table. I thought they had switched to single-threaded event loop management"
 *             overallRating: 4.5
 *             serviceRating: 3.0
 *             qualityPriceRating: 4.0
 *             foodRating: 5.0
 *             atmosphereRating: 4.0
 *             restaurantId: 1
 *     responses:
 *       '200':
 *         description: Review created (object)
 *         content:
 *           application/json:
 *             schema:
 *               type: object  
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int32
 *                   description: Unique identifier of the review
 *                 title:
 *                   type: string
 *                   description: Title of the review
 *                   example: Strange waiters
 *                 content:
 *                   type: string
 *                   description: Content of the review
 *                   example: While I was eating, the waiter stood there the whole time looking at me near the table. I thought they had switched to single-threaded event loop management
 *                 overallRating:
 *                   type: number
 *                   format: float
 *                   description: Overall rating of the experience
 *                   example: 4.5
 *                 serviceRating:
 *                   type: number
 *                   format: float
 *                   description: Rating for the service
 *                   example: 3.0
 *                 qualityPriceRating:
 *                   type: number
 *                   format: float
 *                   description: Rating for the quality/price ratio
 *                   example: 4.0
 *                 foodRating:
 *                   type: number
 *                   format: float
 *                   description: Rating for the food
 *                   example: 5.0
 *                 atmosphereRating:
 *                   type: number
 *                   format: float
 *                   description: Rating for the atmosphere
 *                   example: 4.0
 *                 restaurantId:
 *                   type: integer
 *                   format: int32
 *                   description: Associated restaurant ID
 *                   example: 1
 *             example:
 *               id: 1
 *               title: Strange waiters
 *               content: While I was eating, the waiter stood there the whole time looking at me near the table. I thought they had switched to single-threaded event loop management
 *               overallRating: 4.5
 *               serviceRating: 3.0
 *               qualityPriceRating: 4.0
 *               foodRating: 5.0
 *               atmosphereRating: 4.0
 *               restaurantId: 1
 *       '400':
 *         description: Validation error or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Title field is required
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *             example:
 *               status: 401
 *               error: "Unauthorized problem with the token"
 *       '500':
 *         description: Could not save review. Try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 500
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Could not save review. Try again later.
 */
reviewRouter.post("/addReview", checkRestaurantExists, checkTitleField, checkContentField, checkOverallRatingField, checkServiceRatingField, checkQualityPriceRatingField, checkFoodRatingField, checkAtmosphereRatingField, checkRestaurantIdField, async(req, res, next) => {
    ReviewController.saveReview(req, res).then((review) => {
        console.log(review);
        res.json(review);
    }).catch((err) => {
        console.log(err);
        next(new MyException(500, "Could not save review. Try again later."));
    })
});