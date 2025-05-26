import express from "express";
import { AuthController } from "../controllers/AuthController.js";
import { MyException } from "../utils/MyException.js";
import { checkUserNotExists, checkEmailField, checkPasswordField, checkNameField, checkSurnameField } from "../middleware/userCheck.js";


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
 *             UserEmail: "domgag@gmail.com"
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
authenticationRouter.post("/auth", checkEmailField, checkPasswordField, async(req, res, next) => {
    try {
        const result = await AuthController.checkCredentials(req, res);

        if (result) {
            const token = AuthController.issueToken(req.body.UserEmail);
            return res.status(200).json({ token });
        } else {

            next(new MyException(MyException.UNAUTHORIZED, "Invalid credentials. Try again."));
        }
    } catch (error) {
        console.log(err);
        next(new MyException(MyException.INTERNAL_SERVER_ERROR, "Could not auth user. Try again later."));
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
 *               - UserEmail
 *               - password
 *               - name
 *               - surname
 *             properties:
 *               UserEmail:
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
 *                 UserEmail:
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
 *       400:
 *         description: User credentials are missing or invalid
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
 *                   example: Email field is required
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
authenticationRouter.post("/signup", checkEmailField, checkPasswordField, checkNameField, checkSurnameField, checkUserNotExists, (req, res, next) => {
    AuthController.saveUser(req, res).then((user) => {
        res.json(user);
    }).catch((err) => {
        console.log(err);
        next(new MyException(MyException.INTERNAL_SERVER_ERROR, "Could not save user. Try again later."));
    })
});