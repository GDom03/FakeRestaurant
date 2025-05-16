import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createRestaurantModel } from "./Restaurant.js";
import { createModel as createReviewModel } from "./Review.js";

import 'dotenv/config.js'; //read .env file and make it available in process.env

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
    dialect: process.env.DIALECT,
    retry: {
        max: 5, // Numero massimo di tentativi
        backoffBase: 1000, // Ritardo iniziale tra i tentativi (in millisecondi)
        backoffExponent: 1.5, // Moltiplicatore esponenziale per il ritardo
        timeout: 60000, // Timeout totale massimo per tutti i tentativi (in millisecondi)
    },
});

createUserModel(database);
createRestaurantModel(database);
createReviewModel(database);

export const { User, Restaurant, Review } = database.models;

//associations configuration
User.Reviews = User.hasMany(Review);
Review.User = Review.belongsTo(User);

User.Restaurants = User.hasMany(Restaurant);
Restaurant.User = Restaurant.belongsTo(User);

Restaurant.Reviews = Restaurant.hasMany(Review);
Review.Restaurant = Review.belongsTo(Review);



//synchronize schema (creates missing tables)
database.sync({ alter: true }).then(() => {
    console.log("Database synced correctly");
}).catch(err => {
    console.log("Error with database synchronization: " + err.message);
});