 import  {connectToDb} from  './ database/db.js'
 import dotenv from "dotenv"
import cors from 'cors'
import {createServer} from 'http'
import {setupSocketListeners} from './socket/index.js'; 
import {validateRegistration} from './middlewares/authMiddleware.js'
import { Server as SocketIOServer } from 'socket.io';

import express from "express"
import Router from "./routes/Route.js"

dotenv.config()
const app=express();
const httpServer=createServer(app);
connectToDb();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
const socketIO = new SocketIOServer(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});
app.use(express.json())
app.use(express.urlencoded({extended:false}))
 socketIO.use(validateRegistration);

 
setupSocketListeners(socketIO);
 
app.use('/api',Router)


const PORT=process.env.PORT||3500;
 httpServer.listen(PORT, () => {

  console.log(`Server listening on ${PORT}`);
}); 
 