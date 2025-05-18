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
 *           description: unique identifier of the restaurant
 *         name:
 *           type: string
 *           description: name of the restaurant
 *           example: Trattoria Tecnologie Web
 *         description:
 *           type: string
 *           description: description of the restaurant
 *           example: Waiters can sometimes stand still
 *         type:
 *           type: string  
 *           description: type of the restaurant
 *           example: Tech cuisine
 *         location:
 *           type: object
 *           description: Geographic coordinates of the restaurant
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *               description: Type of geometry
 *               example: Point
 *             coordinates:
 *               type: array
 *               description: Array with longitude and latitude
 *               items:
 *                 type: number
 *               example: [40.827891, 14.201837]
 *       required:
 *         - id
 *         - name
 *         - description
 *         - type
 *         - location
 *       example:
 *         id: 1
 *         name: Trattoria Tecnologie Web
 *         description: Waiters can sometimes stand still
 *         type: Tech cuisine
 *         location:
 *           type: Point
 *           coordinates: [40.827891, 14.201837]
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
        location: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false,
        }

    }, { // Other model options go here
        //the actual table name is inferred from the model name (pluralized) by default
    });
}