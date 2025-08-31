import express from "express";
import dotenv from "dotenv";
import db from "./Database/db.js";
import serviceRouter from './Routes/serviceroute.js';
import teamRouter from "./Routes/teamrouter.js";
import cros from "cors";
dotenv.config()


const app = express();
const port = process.env.BACKEND_PORT;

// app.use(morgan("combined"));
app.use("/uploads", express.static("uploads"));
app.use(cros())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


db();

app.use('/service', serviceRouter);
app.use('/team', teamRouter);


app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server is Runing on ${port}`)
})