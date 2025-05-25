import e from "express";
import { AuthController } from "../controllers/AuthController.js";
import { MyException } from "../utils/MyException.js";

/**
 * This middleware ensures that the user is currently authenticated. If not,
 * redirects to login with an error message.
 */
export function enforceAuthentication(req, res, next) {

    const authHeader = req.headers['authorization']
    let token = undefined;
    if (authHeader) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        next({ status: 401, message: "Unauthorized" });
        return;
    }
    AuthController.isTokenValid(token, (err, decodedToken) => {
        if (err) {
            next(new MyException(401, "Unauthorized"));
        } else {
            req.email = decodedToken.email;
            next();
        }
    });
}