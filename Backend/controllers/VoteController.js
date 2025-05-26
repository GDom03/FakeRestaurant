import { Vote } from "../models/Database.js";


export class VoteController {

    /**
     * Attempts to create a new User
     */
    static async saveVote(req, res) {
        //save new user

        let vote = new Vote({
            ReviewId: req.body.reviewId,
            UserEmail: req.email,
            isUpVote: req.body.isUpVote

        });

        return vote.save(); //returns a Promise
    }


    static async deleteVote(req, res) {
        const where = {};

        where.UserEmail = req.email;
        where.ReviewId = req.body.reviewId;

        const result = await Vote.destroy({
            where
        });

        return result;

    }

}