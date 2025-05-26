import { Image } from "../models/Database.js";
import { minioClient } from "../utils/minioClient.js";

export class ImageController {

    static async saveImage(req, res, next) {
        try {
            const restaurantId = req.body.restaurantId;

            const file = req.file;

            const uniqueFileName = `images/${Date.now()}_${file.originalname}`;

            await minioClient.putObject('images', uniqueFileName, req.file.buffer);

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


    static async deleteImage(req, res) {
        const where = {};

        where.id = req.query.imageId;

        const image = await Image.findOne({ where });

        const result = await Image.destroy({
            where
        });

        if (result > 0) {
            const fileName = image.image;
            await minioClient.removeObject('images', fileName);

        }

        return result;

    }
}