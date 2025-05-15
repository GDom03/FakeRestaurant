import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define('Restaurant', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, { // Other model options go here
        //the actual table name is inferred from the model name (pluralized) by default
    });
}