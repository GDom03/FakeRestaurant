import express from "express";
import morgan from "morgan"; //popular logging middleware (http://expressjs.com/en/resources/middleware/morgan.html)
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { authenticationRouter } from "./routes/authenticationRouter.js";
import { restaurantRouter } from "./routes/restaurantRouter.js";
import { searchRouter } from "./routes/searchRouter.js";
import { reviewRouter } from "./routes/reviewRouter.js";
import { voteRouter } from "./routes/voteRouter.js";
import { enforceAuthentication } from "./middleware/authorization.js";
import { imageRouter } from "./routes/imageRouter.js";
import { MyException } from "./utils/MyException.js";

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
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT' // opzionale ma consigliato
                }
            },
            schemas: {
                // i tuoi eventuali modelli qui
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./routes/*Router.js', './models/*.js'], // i file da scansionare per le annotazioni
});


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//define routes
app.use(authenticationRouter);
app.use(searchRouter);

app.use(enforceAuthentication);
app.use(restaurantRouter);
app.use(imageRouter);
app.use(reviewRouter);
app.use(voteRouter);


// Catch-all per route non trovate (404)
app.use((req, res, next) => {
    next(new MyException(MyException.NOT_FOUND, 'Endpoint not found'));
});

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