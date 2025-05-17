import express from "express";
import { AuthController } from "../controllers/AuthController.js";
import { MyException } from "../utils/MyException.js";
import { checkUserExists } from "../middleware/UserCheck.js";


export const authenticationRouter = express.Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user
 *     description: Check that the user is registered and return a token.
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: User credentials to authenticate
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             email: "domgag@gmail.com"
 *             password: "domgag"
 *     responses:
 *       '200':
 *         description: User authenticated (token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object  
 *               properties:
 *                 token:
 *                   type: string  
 *                   description: JWT token
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDc0OTI3NTIsImV4cCI6MTc0NzU3OTE1Mn0.rQ1bIi0PxTqryICKRAaFETLmszMr_iZe0kzAQwk0Jc0"
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *             example:
 *               error: "Invalid credentials. Try again."
 */
authenticationRouter.post("/auth", async(req, res, next) => {
    try {
        const result = await AuthController.checkCredentials(req, res);

        if (result) {
            const token = AuthController.issueToken(req.body.user);
            return res.status(200).json({ token });
        } else {

            next(new MyException(401, "Invalid credentials. Try again."));
        }
    } catch (error) {

        next(error);
    }
});

/**
 * @swagger
 *  /signup:
 *    post:
 *      description: Sing up user
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: user credentials to save it in the database
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: domgag@gmail.com
 *                password:
 *                  type: string
 *                  example: domgag
 *                name:
 *                  type: string
 *                  example: Domenico
 *                surname: 
 *                  type: string
 *                  example: Gagliotti           
 *      responses:
 *        200:
 *          description: User registered (user object)
 *        401:
 *          description: Could not save user
 */
authenticationRouter.post("/signup", checkUserExists, (req, res, next) => {
    AuthController.saveUser(req, res).then((user) => {
        console.log(user);
        res.json(user);
    }).catch((err) => {
        next(new MyException(500, "Could not save user"));
    })
});