import { Image } from "../models/Database.js";
import { minioClient } from "../utils/minioClient.js";
import path from 'path';


export class ImageController {

    static async saveImage(req, res, next) {
        try {
            const restaurantId = req.locals.restaurantId;

            const file = req.file;

			
        	const ext = path.extname(file.originalname).toLowerCase();

    		const mimeTypes = {
    		  '.jpg': 'image/jpeg',
    		  '.jpeg': 'image/jpeg',
    		  '.png': 'image/png',
    		  '.gif': 'image/gif',
    		  '.webp': 'image/webp',
    		};

    		const contentType = mimeTypes[ext] || 'application/octet-stream';	

			const data = Date.now();
            const uniqueFileName = `images/${data}_${file.originalname}`;

			await minioClient.putObject(
			    "fake-restaurant",
			    uniqueFileName,
			    file.buffer,
			    file.buffer.length,
			    {'Content-Type': contentType}
			);

            let image = new Image({
                image: uniqueFileName,
                RestaurantId: restaurantId
            });

            return image.save(); 

        } catch (error) {
            next(error);
        }
    }

    static async mydelete(where, req, res) {
        const image = await Image.findOne({ where });

        const result = await ImageController.onlyDelete(where, image);

        return result;
    }

    static async onlyDelete(where, image) {
        const result = await Image.destroy({
            where
        });

        if (result > 0) {
            await ImageController.removeFromeCloud(image);

        }
        return result;
    }

    static async removeFromeCloud(image) {
        const fileName = image.image;
        await minioClient.removeObject("fake-restaurant", fileName);
    }

    static async deleteImage(req, res) {
        const where = {};

        where.id = req.locals.imageId;

        return this.mydelete(where, req, res);

    }


    static async getImagesByRestaurant(req, res) {

        const where = {
            RestaurantId: req.locals.restaurantId
        };

        const images = await Image.findAll({
            where
        });

        return images;
    }
}