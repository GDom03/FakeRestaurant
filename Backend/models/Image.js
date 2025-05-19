import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *           description: unique identifier of the image
 *         imageUrl:
 *           type: string
 *           format: binary
 *           description: URL or path of the image in cloud storage
 *       required:
 *         - id
 *         - imageUrl
 *       example:
 *         id: 1
 *         image: "restaurant-images/123456789.jpg"
 */
export function createModel(database) {
    database.define('Image', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, { // Other model options go here
        //the actual table name is inferred from the model name (pluralized) by default
    });
}