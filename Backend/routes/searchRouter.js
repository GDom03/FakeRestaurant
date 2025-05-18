import express from "express";

import { MyException } from "../utils/MyException.js";
import { RestaurantController } from "../controllers/RestaurantController.js";



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
 *         required: true
 *         description: Partial or full name of the restaurant to search for
 *       - in: query
 *         name: emailUser
 *         schema:
 *           type: string
 *           format: email
 *         required: false
 *         description: Email of the user associated with the restaurant
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number for paginated results
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: id
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


    console.log("\n\n\n");
    console.log("query: ", req.query);
    console.log("\n\n\n");

    if (req.query.nameRestaurant == undefined && req.query.emailUser == undefined) {
        return next(new MyException(400, "No search parameters provided"));
    }

    try {
        const restaurants = await RestaurantController.getRestaurants(req, res);
        res.json(restaurants);
    } catch (err) {
        console.log(err);
        next(new MyException(500, "Could not fetch restaurants. Try again later."));
    }

});