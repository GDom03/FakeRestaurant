import express from "express";
import morgan from "morgan"; //popular logging middleware (http://expressjs.com/en/resources/middleware/morgan.html)
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { authenticationRouter } from "./routes/authenticationRouter.js";
import { restaurantRouter } from "./routes/restaurantRouter.js";
import { searchRouter } from "./routes/searchRouter.js";
import { enforceAuthentication } from "./middleware/authorization.js";

const app = express();
const PORT = 3000;


// Register the morgan logging middleware, use the 'dev' format
app.use(morgan('dev'));

app.use(cors()); //API will be accessible from anywhere. We'll talk about this in Lecture 23!

// Parse incoming requests with a JSON payload
app.use(express.json());

//generate OpenAPI spec and show swagger ui
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'FakeResturant',
            version: '1.0.0',
        },
        components: {
            schemas: {

            }
        }
    },
    apis: ['./routes/*Router.js', './models/*.js'], // files containing annotations
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//define routes
app.use(authenticationRouter);
app.use(searchRouter);

app.use(enforceAuthentication);
app.use(restaurantRouter);

//app.use(todoRouter);

//error handler
app.use((err, req, res, next) => {
    // Log dello stack di errore per il debugging
    console.error(err.stack);

    res
        .status(err.status || 500)
        .json({
            status: err.status || 500,
            message: err.message || "An unexpected error occurred",
        });
});


app.listen(PORT);