import express from "express";
import { RestaurantController } from "../controllers/RestaurantController.js";
import { MyException } from "../utils/MyException.js";
import { checkNameField, checkDescriptionField, checkLatitudeField, checkLongitudeField, checkTypeField, checkRestaurantIdField, checkRestaurantExists } from "../middleware/restaurantCheck.js";
import { SuccessMessage } from "../utils/SuccessMessage.js";


export const restaurantRouter = express.Router();


/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     description: Create a new restaurant with the given data
 *     tags:
 *       - Insert Resources
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Restaurant data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *           example:
 *             name: "Trattoria Tecnologie Web"
 *             description: "Waiters can sometimes stand still"
 *             type: "Tech cuisine"
 *             latitude: 40.827891
 *             longitude: 14.201837
 *     responses:
 *       '200':
 *         description: Restaurant created (object)
 *         content:
 *           application/json:
 *             schema:
 *               type: object  
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int32
 *                   description: Unique identifier of the restaurant
 *                 name:
 *                   type: string
 *                   description: Name of the restaurant
 *                   example: Trattoria Tecnologie Web
 *                 description:
 *                   type: string
 *                   description: Description of the restaurant
 *                   example: Waiters can sometimes stand still
 *                 type:
 *                   type: string  
 *                   description: Type of the restaurant
 *                   example: Tech cuisine
 *                 latitude:
 *                   type: number
 *                   format: float
 *                   description: Geographic latitude of the restaurant
 *                   example: 40.827891
 *                 longitude:
 *                   type: number
 *                   format: float
 *                   description: Geographic longitude of the restaurant
 *                   example: 14.201837
 *             example:
 *               id: 1
 *               name: Trattoria Tecnologie Web
 *               description: Waiters can sometimes stand still
 *               type: Tech cuisine
 *               latitude: 40.827891
 *               longitude: 14.201837
 *       '400':
 *         description: User credentials are missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 409
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Name field is required
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
 *         description: Could not save user. Try again later.
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
 *                   example: Could not save user. Try again later.
 */
restaurantRouter.post("/restaurants", checkNameField, checkDescriptionField, checkTypeField, checkLatitudeField, checkLongitudeField, async(req, res, next) => {
    RestaurantController.saveRestaurant(req, res).then((restaurant) => {
        console.log(restaurant);
        res.json(restaurant);
    }).catch((err) => {
        console.log(err);
        next(new MyException(MyException.INTERNAL_SERVER_ERROR, "Could not save restaurant. Try again later."));
    })
});

/**
 * @swagger
 * /restaurants:
 *   delete:
 *     summary: Delete a restaurant
 *     description: Deletes a restaurant specified by its ID.
 *     tags:
 *       - Delete Resources
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: idRestaurant
 *         required: true
 *         description: The ID of the restaurant to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Restaurant deleted successfully
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
 *                   example: "Restaurant deleted successfully"
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
 *                   example: "idRestaurant is required"
 *       '404':
 *         description: Not Found - Restaurant not found or not owned by user
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
 *                   example: "Restaurant not found or not owned by user"
 *       '500':
 *         description: Internal Server Error - Could not delete restaurant
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
 *                   example: "Could not delete restaurant. Try again later."
 */
restaurantRouter.delete("/restaurants", checkRestaurantIdField, checkRestaurantExists, async(req, res, next) => {

    try {
        let result = await RestaurantController.deleteRestaurant(req, res);
        if (result > 0) {
            res.json(JSON.parse(new SuccessMessage(SuccessMessage.OK, "Restaurant deleted successfully").toString()));
        }

    } catch (err) {
        console.log(err);
        next(new MyException(MyException.INTERNAL_SERVER_ERROR, "Could not delete restaurant. Try again later."));
    }


});