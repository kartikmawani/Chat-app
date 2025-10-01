import mongoose from "mongoose"

async function connectToDb(){
    mongoose.connect(process.env.MONGO_URI,{}
    ).then(()=>console.log('database connected succesfully '))
     
.catch((error)=>console.log(error))}

  export default  connectToDb;
 

