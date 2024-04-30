import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dataRouter from "./routes/dataRoutes.js";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import limiter from "./middlewares/ratelimiterMiddleware.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));




app.get("/", (req, res) => {
    res.send("Server running !");
});

app.use("/auth",limiter, authRouter);
app.use("/data",limiter, dataRouter);

const CONNECT_URL = process.env.CONNECT_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`Server running on: http://localhost:${PORT}`) }))
    .catch((err) => console.log(err.message));





