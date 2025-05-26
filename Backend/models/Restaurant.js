import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *           description: Unique identifier of the restaurant
 *         name:
 *           type: string
 *           description: Name of the restaurant
 *           example: Trattoria Tecnologie Web
 *         description:
 *           type: string
 *           description: Description of the restaurant
 *           example: Waiters can sometimes stand still
 *         type:
 *           type: string  
 *           description: Type of the restaurant
 *           example: Tech cuisine
 *         latitude:
 *           type: number
 *           format: float
 *           description: Geographic latitude of the restaurant
 *           example: 40.827891
 *         longitude:
 *           type: number
 *           format: float
 *           description: Geographic longitude of the restaurant
 *           example: 14.201837
 *       required:
 *         - id
 *         - name
 *         - description
 *         - type
 *         - latitude
 *         - longitude
 *       example:
 *         id: 1
 *         name: Trattoria Tecnologie Web
 *         description: Waiters can sometimes stand still
 *         type: Tech cuisine
 *         latitude: 40.827891
 *         longitude: 14.201837
 */
export function createModel(database) {
    database.define('Restaurant', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }

    }, {});
}