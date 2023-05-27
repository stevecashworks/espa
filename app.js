import express from "express";
import dotenv from 'dotenv';
import connectDb from "./connectdb.js";
import cors from 'cors';
import userRouter from "./routes/user/userRoute.js";
import investRouter from './routes/investments/investRoute.js'
import user from "./models/user.js";
import request from "./models/request.js";
import { sendMail } from "./mail.js";
import stats from "./models/stats.js";
import statRoute from "./routes/stats/statRoute.js";
dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
 const entryPoint='/api/v3'
// my routes
app.use(`${entryPoint}/users`,userRouter)
app.use(`${entryPoint}/investments`,investRouter)
app.use(`${entryPoint}/stats`,statRoute)

//error
app.use((err,req,res,next)=>{
const code=err.code||500
    console.log(err);
res.status(code).json({success:false,result:err.message})
    
})

const port=5000||process.env.port;

const start=async()=>{
    try {
        console.log(process.env.mongo_uri)
        await connectDb(process.env.mongo_uri)
        app.listen(port,()=>{console.log(`${new Date(Date.now())}: database connected,server is listening on port: ${port} `)})
        
        // resets the databases/collections

        // await request.deleteMany()
        // await user.deleteMany()

    } catch (error) {
        console.log(error)
    }
}
start()