import { DataTypes } from "sequelize";

export function createModel(database) {
    database.define('Review', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        }


    }, { // Other model options go here
        //the actual table name is inferred from the model name (pluralized) by default
    });
}