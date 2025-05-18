import express from "express";


export const searchRouter = express.Router();

searchRouter.get("/getRestaurants", async(req, res, next) => {

    const { nameRestaurant = '', idUser = -1, page = -1, sort = '', fully = '' } = req.query;

    if (nameRestaurant === '' && idUser === -1) {
        return next(new MyException(400, "No search parameters provided"));
    }
    /*
    try {
        const restaurants = await RestaurantController.getRestaurants(nameRestaurant, idUser, page, sort, fully);
        res.json(restaurants);
    } catch (err) {
        console.log(err);
        next(new MyException(500, "Could not fetch restaurants. Try again later."));
    }
    */
});