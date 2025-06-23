import express from "express";

import { MyException } from "../utils/MyException.js";
import { SuccessMessage } from "../utils/SuccessMessage.js";
import { checkEmailField, checkEmailMatch, checkUserExists } from "../middleware/userCheck.js";
import { UserController } from "../controllers/UserController.js"

export const userRouter = express.Router();

/**
 * @swagger
 * /users/{UserEmail}:
 *   delete:
 *     summary: Delete a user by email
 *     description: Deletes the user that matches the provided email address.
 *     tags:
 *       - Delete Resources
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: UserEmail
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: The email of the user to delete.
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       '400':
 *         description: Invalid email format or email mismatch
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Could not delete user. Try again later.
 */
userRouter.delete('/users/:UserEmail', checkEmailField, checkEmailMatch, checkUserExists, async (req, res, next) => {
  try {
    let result = await UserController.deleteUser(req, res);
    if (result > 0) {
      res.json(JSON.parse(new SuccessMessage(SuccessMessage.OK, "User deleted successfully").toString()));
    }
  } catch (err) {
    console.log(err);
    next(new MyException(MyException.INTERNAL_SERVER_ERROR, "Could not delete user. Try again later."));
  }
});
