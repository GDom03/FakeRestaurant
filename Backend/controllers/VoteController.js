import { Vote } from "../models/Database.js";


export class VoteController {

    /**
     * Attempts to create a new User
     */
    static async saveVote(req, res) {
        //save new user

        let vote = new Vote({
            ReviewId: req.locals.reviewId,
            UserEmail: req.email,
            isUpVote: req.locals.isUpVote

        });

        return vote.save(); //returns a Promise
    }

	static async getVote(req, res) {
        
		const where = {
			ReviewId: req.locals.reviewId,
            UserEmail: req.email,
		};

		const vote = await Vote.findAll({
            where,
            
        });
        
        return vote; //returns a Promise
    }

	static async getVoteOfReview(req, res) {
        
		const where = {
			ReviewId: req.locals.reviewId,
          
		};

		const vote = await Vote.findAll({
            where,
            
        });
        
        return vote; //returns a Promise
    }


    static async deleteVote(req, res) {
        const where = {};

        where.UserEmail = req.email;
        where.ReviewId = req.locals.reviewId;

        const result = await Vote.destroy({
            where
        });

        return result;

    }

}