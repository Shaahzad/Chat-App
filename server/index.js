import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userrouter from "./Router/index.js"
import cookieParser from "cookie-parser"


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use("/api", userrouter)

const connect = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log(err);
    })
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connect();
})
