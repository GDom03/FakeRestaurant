import { User } from "../models/Database.js";
import Jwt from "jsonwebtoken";


export class AuthController {
    /**
     * Handles post requests on /auth. Checks that the given credentials are valid
     * @param {http.IncomingMessage} request 
     * @param {http.ServerResponse} response 
     */
    static async checkCredentials(req, res) {
        let user = new User({ //user data specified in the request
            email: req.body.UserEmail,
            password: req.body.password
        });

        let found = await User.findOne({
            where: {
                email: user.email,
                password: user.password //password was hashed when creating user
            }
        });

        return found !== null;
    }

    /**
     * Attempts to create a new User
     */
    static async saveUser(req, res) {
        //save new user
        let user = new User({
            email: req.body.UserEmail,
            password: req.body.password,
            name: req.body.name,
            surname: req.body.surname

        });
        return user.save(); //returns a Promise
    }

    static issueToken(sourceEmail) {
        return Jwt.sign({ email: sourceEmail }, process.env.TOKEN_SECRET, { expiresIn: `${24*60*60}s` });
    }

    static isTokenValid(token, callback) {
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }
}