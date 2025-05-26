import express from "express";

import { MyException } from "../utils/MyException.js";
import { SuccessMessage } from "../utils/SuccessMessage.js";
import { VoteController } from "../controllers/VoteController.js";
import { checkIsUpVoteField, checkReviewIdField } from "../middleware/voteCheck.js";
import { ReviewController } from "../controllers/ReviewController.js";
import { checkReviewExists } from "../middleware/reviewCheck.js";

export const voteRouter = express.Router();


/**
 * @swagger
 * /votes:
 *   post:
 *     summary: Create a new vote
 *     description: Submit a vote (upvote or downvote) for a review
 *     tags:
 *       - Insert Resources
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Vote data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vote'
 *           example:
 *             isUpVote: true
 *             reviewId: 1
 *     responses:
 *       '200':
 *         description: Vote created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object  
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int32
 *                   description: Unique identifier of the vote
 *                 isUpVote:
 *                   type: boolean
 *                   description: Whether the vote is an upvote (true) or downvote (false)
 *                   example: true
 *                 reviewId:
 *                   type: integer
 *                   description: ID of the review the vote belongs to
 *                   example: 1
 *             example:
 *               id: 1
 *               isUpVote: true
 *               ReviewId: 123
 *       '400':
 *         description: Missing or invalid vote data
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
 *                   example: isUpVote field is required
 *       '401':
 *         description: Unauthorized - invalid token or credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 error:
 *                   type: string
 *                   example: Unauthorized problem with the token
 *       '500':
 *         description: Could not save vote. Try again later.
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
 *                   example: Could not save vote. Try again later.
 */
voteRouter.post("/votes", checkIsUpVoteField, checkReviewIdField, checkReviewExists, async(req, res, next) => {

    VoteController.saveVote(req, res).then((vote) => {
        console.log(vote);
        res.json(vote);
    }).catch((err) => {
        console.log(err);
        next(new MyException(500, "Could not save vote. Try again later."));
    })
});

/**
 * @swagger
 * /votes:
 *   delete:
 *     summary: Delete a vote
 *     description: Deletes a vote specified by its ReviewId.
 *     tags:
 *       - Delete Resources
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: ReviewId
 *         required: true
 *         description: The ID of the review associated with the vote to delete
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       '200':
 *         description: Vote deleted successfully
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
 *                   example: "Vote deleted successfully"
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
 *                   example: "ReviewId is required"
 *       '404':
 *         description: Not Found - Vote not found or not associated with review
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
 *                   example: "Vote not found or not associated with the review"
 *       '500':
 *         description: Internal Server Error - Could not delete vote
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
 *                   example: "Could not delete vote. Try again later."
 */
voteRouter.delete("/votes", checkReviewIdField, checkReviewExists, async(req, res, next) => {

    try {
        let result = await VoteController.deleteVote(req, res);
        if (result > 0) {
            res.json(JSON.parse(new SuccessMessage(200, "Vote deleted successfully").toString()));
        }

    } catch (err) {
        console.log(err);
        next(new MyException(500, "Could not delete vote. Try again later."));
    }


});