import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import messageRoutes from './routes/messageRoutes.js'
import cors from 'cors'
import {app,server} from './socket/socket.js'
// import { Server } from 'socket.io'

dotenv.config()

//connection database
connectDB()

// const app = express();
// cors
const corsOptions ={
    origin:"http://localhost:3000",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
    
  };
  

//middeware
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

//routing api
app.use('/api/user',userRoutes)
app.use('/api/message',messageRoutes)


app.get('/',(rq,rs)=>{
    rs.send('hare krishna')
})

// create server 
const PORT = process.env.PORT || 2914;
server.listen(PORT, ()=>{
    console.log(`your server is running on port ${PORT}`)
})