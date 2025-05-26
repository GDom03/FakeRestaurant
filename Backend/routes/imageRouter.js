import express from "express";
import { MyException } from "../utils/MyException.js";
import { checkRestaurantIdField, checkRestaurantExists } from "../middleware/restaurantCheck.js";
import { checkImageField } from "../middleware/imageCheck.js";
import { ImageController } from "../controllers/ImageController.js";
import { checkImageIdField, checkImageExists, checkCanDeleteImage } from "../middleware/imageCheck.js";
import { SuccessMessage } from "../utils/SuccessMessage.js";
import multer from 'multer';


export const imageRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Upload an image for a restaurant
 *     description: Uploads an image file associated with a specific restaurant. The image is stored in MinIO and linked to the restaurant in the database.
 *     tags:
 *       - Insert Resources
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *               - image
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 description: The ID of the restaurant
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Image successfully saved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier of the image
 *                   example: 1
 *                 image:
 *                   type: string
 *                   description: name of the saved image
 *                   example: images/1747618498030_techweb.png
 *       '400':
 *         description: Missing or invalid parameters
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
 *                   example: restaurantId field is required
 *       '404':
 *         description: Restaurant not found
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
 *                   example: Restaurant with ID 123 not found
 *       '500':
 *         description: Failed to save image
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
 *                   example: Could not save image. Try again later.
 */
imageRouter.post("/images", upload.single('image'), checkRestaurantIdField, checkImageField, checkRestaurantExists, async(req, res, next) => {
    ImageController.saveImage(req, res, next).then((image) => {
        if (image) {
            res.json(image);
        } else {
            next(new MyException(500, "Could not save image. Try again later."));
        }
    }).catch((error) => {
        console.log(err);
        next(new MyException(500, error.message));
    });

});


/**
 * @swagger
 * /images:
 *   delete:
 *     summary: Delete an image
 *     description: Deletes an image by its ID and removes it from MinIO and the database.
 *     tags:
 *       - Delete Resources
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: imageId
 *         required: true
 *         description: The ID of the image to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Image deleted successfully
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
 *                   example: "Image deleted successfully"
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
 *                   example: "imageId is required"
 *       '404':
 *         description: Not Found - Image not found or not owned by user
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
 *                   example: "Image not found or not owned by user"
 *       '500':
 *         description: Internal Server Error - Could not delete image
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
 *                   example: "Could not delete image. Try again later."
 */
imageRouter.delete("/images", checkImageIdField, checkImageExists, checkCanDeleteImage, async(req, res, next) => {

    try {
        let result = await ImageController.deleteImage(req, res);
        if (result > 0) {
            res.json(JSON.parse(new SuccessMessage(SuccessMessage.OK, "Image deleted successfully").toString()));
        }

    } catch (err) {
        console.log(err);
        next(new MyException(MyException.INTERNAL_SERVER_ERROR, "Could not delete image. Try again later."));
    }


});