import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectToDb from './db/db.js'


connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
 
app.use('/api',Router)
const app=express()
 const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log("Server connected")
})