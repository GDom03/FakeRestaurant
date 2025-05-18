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
 *           description: unique identifier of the Review
 *           example: 1
 *         title:
 *           type: string
 *           description: title of the Review
 *           example: Strange waiters
 *         content:
 *           type: string
 *           description: content of the Review
 *           example: While I was eating, the waiter stood there the whole time looking at me near the table. I thought they had switched to single-threaded event loop management    
 *       required:
 *         - id
 *         - title
 *       example:
 *         id: 1
 *         title: Strange waiters
 *         content: "While I was eating, the waiter stood there the whole time looking at me near the table. I thought they had switched to single-threaded event loop management"
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
        }


    }, { // Other model options go here
        //the actual table name is inferred from the model name (pluralized) by default
    });
}