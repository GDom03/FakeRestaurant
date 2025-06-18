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
    isUpVote: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ReviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true   // 🔑 Parte della PK
    },
    UserEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true   // 🔑 Parte della PK
    }
  });
}
