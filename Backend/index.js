import express from "express";
import dotenv from "dotenv";
import db from "./Database/db.js";
import serviceRouter from './Routes/serviceroute.js';
import teamRouter from "./Routes/teamrouter.js";
import tesitimonialRouter from "./Routes/testimonialroute.js";
import contactRouter from "./Routes/contactroute.js";
import userRouter from "./Routes/useroute.js";
import loanRouter from "./Routes/LoanRouter.js";
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
app.use("/testimonial", tesitimonialRouter);
app.use("/contact", contactRouter);
app.use("/user", userRouter);
app.use("/loan",loanRouter);


app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server is Runing on ${port}`)
})