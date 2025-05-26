import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the vote
 *           example: 1
 *         isUpVote:
 *           type: boolean
 *           description: Indicates if the vote is an upvote (true) or downvote (false)
 *           example: true
 *       required:
 *         - isUpVote
 */
export function createModel(database) {


    database.define('Vote', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        isUpVote: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

    }, {
        indexes: [{
            unique: true,
            fields: ['ReviewId', 'UserEmail']
        }, ]
    });
}