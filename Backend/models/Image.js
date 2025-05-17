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
 *         image:
 *           type: string
 *           format: binary
 *           description: image of the restaurant
 *       required:
 *         - id
 *         - image
 *       example:
 *         id: 1
 *         image: "base64-encoded-image-string"
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
            type: DataTypes.BLOB,
            allowNull: false,
        },

    }, { // Other model options go here
        //the actual table name is inferred from the model name (pluralized) by default
    });
}