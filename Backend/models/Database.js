import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createRestaurantModel } from "./Restaurant.js";
import { createModel as createReviewModel } from "./Review.js";
import { createModel as createImageModel } from "./Image.js";

import 'dotenv/config.js'; //read .env file and make it available in process.env

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
    dialect: process.env.DIALECT,
    retry: {
        max: 10, // numero di tentativi
        backoffBase: 1000, // millisecondi tra ogni tentativo
        backoffExponent: 1.1 // aumento esponenziale del ritardo
    }
});

createUserModel(database);
createRestaurantModel(database);
createReviewModel(database);
createImageModel(database);

export const { User, Restaurant, Review, Image } = database.models;

//associations configuration
User.Reviews = User.hasMany(Review, { onUpdate: 'CASCADE' });
Review.User = Review.belongsTo(User, { foreignKey: { allowNull: false }, onUpdate: 'CASCADE' });

User.Restaurants = User.hasMany(Restaurant, { onUpdate: 'CASCADE' });
Restaurant.User = Restaurant.belongsTo(User, { foreignKey: { allowNull: false }, onUpdate: 'CASCADE' });

Restaurant.Reviews = Restaurant.hasMany(Review, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Review.Restaurant = Review.belongsTo(Restaurant, { foreignKey: { allowNull: false }, onDelete: 'NO ACTION', onUpdate: 'CASCADE' });

Restaurant.Images = Restaurant.hasMany(Image, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Image.Restaurant = Image.belongsTo(Restaurant, { foreignKey: { allowNull: false }, onDelete: 'NO ACTION', onUpdate: 'CASCADE' });



//synchronize schema (creates missing tables)
database.sync({ alter: true }).then(() => {
    console.log("Database synced correctly");
}).catch(err => {
    console.log("Error with database synchronization: " + err.message);
});