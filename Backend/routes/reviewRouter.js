import express from "express";
import { ReviewController } from "../controllers/ReviewController.js";
import { MyException } from "../utils/MyException.js";
import { checkTitleField, checkContentField, checkOverallRatingField, checkServiceRatingField, checkQualityPriceRatingField, checkFoodRatingField, checkAtmosphereRatingField } from "../middleware/reviewCheck.js";
import { checkRestaurantIdField, checkRestaurantExists } from "../middleware/restaurantCheck.js";
import { SuccessMessage } from "../utils/SuccessMessage.js";
import { checkReviewExists } from "../middleware/reviewCheck.js";
import { checkReviewIdField } from "../middleware/voteCheck.js";


export const reviewRouter = express.Router();

/**
 * @swagger
 * /reviews:
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
reviewRouter.post("/reviews", checkTitleField, checkContentField, checkOverallRatingField, checkServiceRatingField, checkQualityPriceRatingField, checkFoodRatingField, checkAtmosphereRatingField, checkRestaurantIdField, checkRestaurantExists, async(req, res, next) => {
    ReviewController.saveReview(req, res).then((review) => {
        console.log(review);
        res.json(review);
    }).catch((err) => {
        console.log(err);
        next(new MyException(500, "Could not save review. Try again later."));
    })
});


/**
 * @swagger
 * /reviews:
 *   delete:
 *     summary: Delete a review
 *     description: Deletes a review specified by its ID.
 *     tags:
 *       - Delete Resources
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: idReview
 *         required: true
 *         description: The ID of the review to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object  
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 200
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Review deleted successfully"
 *       '400':
 *         description: Bad Request - Missing or invalid parameters
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
 *                   example: "idReview is required"
 *       '404':
 *         description: Not Found - Review not found or not owned by user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 404
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Review not found or not owned by user"
 *       '500':
 *         description: Internal Server Error - Could not delete review
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
 *                   example: "Could not delete review. Try again later."
 */
reviewRouter.delete("/reviews", checkReviewIdField, checkReviewExists, async(req, res, next) => {

    try {
        let result = await ReviewController.deleteReview(req, res);
        if (result > 0) {
            res.json(JSON.parse(new SuccessMessage(200, "Review deleted successfully").toString()));
        }

    } catch (err) {
        console.log(err);
        next(new MyException(500, "Could not delete review. Try again later."));
    }


});