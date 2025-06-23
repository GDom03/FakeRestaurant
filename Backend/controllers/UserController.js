import { User, Restaurant } from "../models/Database.js";
import { RestaurantController } from "./RestaurantController.js";

export class UserController {

	static async deleteUser(req, res) {
		const where = {email : req.email};
		const whereRestaurant = {UserEmail : req.email};


		const restaurants = await Restaurant.findAll(
			whereRestaurant
		);


		for(const item of restaurants){
			req.locals.restaurantId = item.id;
			await RestaurantController.deleteRestaurant(req,res);
		}
		
		
		const result = await User.destroy({
			where
		});

		
		return result;

	}



}