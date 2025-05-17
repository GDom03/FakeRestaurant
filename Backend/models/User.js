import { DataTypes } from "sequelize";
import { createHash } from "crypto";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name of the user
 *           example: Domenico
 *         surname:
 *           type: string
 *           description: surname of the user
 *           example: Gagliotti
 *         email:
 *           type: string
 *           format: email
 *           description: email of the user
 *           example: domgag@gmail.com
 *         password:
 *           type: string
 *           description: password hashed SHA-256
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - password
 *       example:
 *         name: Domenico
 *         surname: Gagliotti
 *         email: domgag@gmail.com
 *         password: "acc8bc4befa697b5b7b98dbe4490af3a013b27156f94a4962fb354c16064f8d0"
 */
export function createModel(database) {
    database.define('User', {
        // Model attributes are defined here
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) { //custom setter method
                // Saving passwords in plaintext in a database is a no-no!
                // You should at least store a secure hash of the password (as done here).
                // Even better, you should use a random salt to protect against rainbow tables.
                let hash = createHash("sha256");
                this.setDataValue('password', hash.update(value).digest("hex"));
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, { // Other model options go here
        //the actual table name is inferred from the model name (pluralized) by default
    });
}