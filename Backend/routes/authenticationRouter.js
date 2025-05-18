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
 *     tags:
 *       - Authentication
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
 *               status: 401        
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
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Register a new user with email, password, name, and surname.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User credentials to save in the database
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - surname
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: domgag@gmail.com
 *               password:
 *                 type: string
 *                 example: domgag
 *               name:
 *                 type: string
 *                 example: Domenico
 *               surname:
 *                 type: string
 *                 example: Gagliotti
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: domgag@gmail.com
 *                 name:
 *                   type: string
 *                   example: Domenico
 *                 surname:
 *                   type: string
 *                   example: Gagliotti
 *                 password:
 *                   type: string
 *                   example: domgag
 *       409:
 *         description: User already registered. Try to login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 409
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: User already registered. Try to login.
 *       500:
 *         description: Could not save user. Try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 500
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Could not save user. Try again later.
 */
authenticationRouter.post("/signup", checkUserExists, (req, res, next) => {
    AuthController.saveUser(req, res).then((user) => {
        console.log(user);
        res.json(user);
    }).catch((err) => {
        next(new MyException(500, "Could not save user. Try again later."));
    })
});