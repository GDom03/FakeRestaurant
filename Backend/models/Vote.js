import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       required:
 *         - isUpVote
 *         - ReviewId
 *         - UserEmail
 *       properties:
 *         isUpVote:
 *           type: boolean
 *           description: Indicates if the vote is an upvote (true) or a downvote (false)
 *           example: true
 *         ReviewId:
 *           type: integer
 *           description: ID of the review being voted on
 *           example: 20
 *         UserEmail:
 *           type: string
 *           format: email
 *           description: Email of the user who cast the vote
 *           example: domgag@gmail.com
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
      primaryKey: true   // Parte della PK
    },
    UserEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true   // Parte della PK
    }
  });
}
