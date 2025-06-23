import { Vote } from "../models/Database.js";


export class VoteController {

    static async saveVote(req, res) {

        let vote = new Vote({
            ReviewId: req.locals.reviewId,
            UserEmail: req.email,
            isUpVote: req.locals.isUpVote

        });

        return vote.save(); 
    }

	static async getVote(req, res) {
        
		const where = {
			ReviewId: req.locals.reviewId,
            UserEmail: req.email,
		};

		const vote = await Vote.findAll({
            where,
            
        });
        
        return vote; 
    }

	static async getVoteOfReview(req, res) {
        
		const where = {
			ReviewId: req.locals.reviewId,
          
		};

		const vote = await Vote.findAll({
            where,
            
        });
        
        return vote; 
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