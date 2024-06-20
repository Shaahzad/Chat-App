import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userrouter from "./Router/index.js"
import cookieParser from "cookie-parser"
import http from "http"
import { Server } from "socket.io"
import getuserDeatil from "./helper/userdetail.js"
import UserModel from "./Models/Usermodel.js"

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


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        withCredentials: true
    }
});

const Onlineuser = new Set()

io.on("connection", async(socket) => {
    console.log("Connected to socket.io", socket.id);

    const token = socket.handshake.auth.token

    const user = await getuserDeatil(token)
 
    socket.join(user._id)
    Onlineuser.add(user._id.toString())

    io.emit("Onlineuser",Array.from(Onlineuser))

    socket.on("message-page", async(userId) => {
        console.log(userId);
        const userDetail = await UserModel.findById(userId).select("-password")
           
        const payload = {
            _id : userDetail._id,
            name : userDetail.name,
            email : userDetail.email,
            profilePic : userDetail.profilePic,
            onlineuser : Onlineuser.has(userId)
        }

        socket.emit("message-user", payload)
    })

    socket.on("disconnect", () => {
        Onlineuser.delete(user._id)
        console.log("Disconnected from socket.io", socket.id);
    })
})


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connect();
})
