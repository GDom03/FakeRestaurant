import { Image } from "../models/Database.js";
import { minioClient } from "../utils/minioClient.js";

export class ImageController {

    static async saveImage(req, res, next) {
        try {
            const restaurantId = req.body.restaurantId;

            const file = req.file;

            const uniqueFileName = `images/${Date.now()}_${file.originalname}`;


            await minioClient.putObject("fake-restaurant", uniqueFileName, req.file.buffer);

            // Crea una nuova istanza di Image con i parametri corretti
            let image = new Image({
                image: uniqueFileName,
                RestaurantId: restaurantId
            });

            return image.save(); // restituisce una Promise

        } catch (error) {
            // Passa l’errore al middleware di gestione errori
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

        where.id = req.query.imageId;

        return this.mydelete(where, req, res);

    }


    static async getImagesByRestaurant(req, res) {

        const where = {
            RestaurantId: req.params.restaurantId
        };

        const images = await Image.findAll({
            where
        });

        return images;
    }
}