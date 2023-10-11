import mongoose from "mongoose"
import{MongoMemoryServer} from "mongodb-memory-server"

import express from "express";
import cors from "cors"
import morgan from "morgan";
import router from "./router/router.js";
import bodyParser from "body-parser";

const server=express()
const port=8080

// api route
// middlewares
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())
server.use(express.json())


server.use(cors())
server.use(morgan("tiny"))
server.use("/api",router)
server.get("/",(req,res)=>{ 
    res.send("backends")
})

// start server only when we have a valid connection
const mongod=await MongoMemoryServer.create()
const geturi=mongod.getUri()
mongoose.set("strictQuery",true)
const db=await mongoose.connect(geturi)

server.listen(port,()=>{
    console.log(`server listening to ${port}`)
})  