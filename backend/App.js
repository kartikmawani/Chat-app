import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectToDb from './db/db.js'


connectToDb();
const app=express()
 const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log("Server connected")
})