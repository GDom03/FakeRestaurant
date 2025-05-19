import { Image } from "../models/Database.js";
import { minioClient } from "../utils/minioClient.js";

export class ImageController {

    static async saveImage(req, res, next) {
        try {
            console.log("\n\n1\n\n");
            const restaurantId = req.body.restaurantId;
            console.log("\n\n2\n\n");
            const file = req.file;
            console.log("\n\n3\n\n");

            const uniqueFileName = `images/${Date.now()}_${file.originalname}`;
            console.log("\n\n4\n\n");

            await minioClient.putObject('images', uniqueFileName, req.file.buffer);


            // Crea una nuova istanza di Image con i parametri corretti
            let image = new Image({
                image: uniqueFileName,
                RestaurantId: restaurantId
            });
            console.log("\n\n6\n\n");

            return image.save(); // restituisce una Promise

        } catch (error) {
            // Passa l’errore al middleware di gestione errori
            next(error);
        }
    }
}