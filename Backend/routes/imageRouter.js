import express from "express";
import { MyException } from "../utils/MyException.js";
import { checkRestaurantIdField, checkRestaurantExists } from "../middleware/restaurantCheck.js";
import { checkImageField } from "../middleware/imageCheck.js";
import { ImageController } from "../controllers/ImageController.js";
import multer from 'multer';


export const imageRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * /uploadImage:
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
imageRouter.post("/uploadImage", upload.single('image'), checkRestaurantIdField, checkImageField, checkRestaurantExists, async(req, res, next) => {

    console.log(process.env.MINIO_HOST);
    ImageController.saveImage(req, res, next).then((image) => {
        if (image) {
            res.json(image);
        } else {
            next(new MyException(500, "Could not save image. Try again later."));
        }
    }).catch((error) => {
        next(new MyException(500, error.message));
    });

});