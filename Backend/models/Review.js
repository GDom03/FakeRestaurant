import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *           description: Unique identifier of the Review
 *           example: 1
 *         title:
 *           type: string
 *           description: Title of the Review
 *           example: Strange waiters
 *         content:
 *           type: string
 *           description: Content of the Review
 *           example: While I was eating, the waiter stood there the whole time looking at me near the table. I thought they had switched to single-threaded event loop management
 *         overallRating:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           description: Overall rating of the experience
 *           example: 4.5
 *         serviceRating:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           description: Rating for the service
 *           example: 3.0
 *         qualityPriceRating:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           description: Rating for the quality/price ratio
 *           example: 4.0
 *         foodRating:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           description: Rating for the food
 *           example: 5.0
 *         atmosphereRating:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           description: Rating for the atmosphere
 *           example: 4.0
 *       required:
 *         - id
 *         - title
 *         - content
 *         - overallRating
 *         - serviceRating
 *         - qualityPriceRating
 *         - foodRating
 *         - atmosphereRating
 *       example:
 *         id: 1
 *         title: Strange waiters
 *         content: While I was eating, the waiter stood there the whole time looking at me near the table. I thought they had switched to single-threaded event loop management
 *         overallRating: 4.5
 *         serviceRating: 3.0
 *         qualityPriceRating: 4.0
 *         foodRating: 5.0
 *         atmosphereRating: 4.0
 */
export function createModel(database) {
    database.define('Review', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        overallRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            },
        },
        serviceRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            },
        },
        qualityPriceRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            },
        },
        foodRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            },
        },
        atmosphereRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            },
        }


    }, {

    });
}