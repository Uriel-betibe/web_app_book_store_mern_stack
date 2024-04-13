import express, { request, response } from "express"
import { PORT, mongoDbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors'

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware to handle CORS policy
//option 1 : Allow all origins with Default of cors(*)
app.use(cors());


//option 2 : Allow custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("First Express request");
})

app.use('/books', booksRoute);

mongoose
        .connect(mongoDbURL)
        .then(() => {
            console.log("App is connected to db")
            app.listen(PORT, () => {
                console.log(`App is listening to port: ${PORT}`);
            } );
        })
        .catch((error) => {
            console.log(error);
        });