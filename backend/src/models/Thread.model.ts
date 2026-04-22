import mongoose from 'mongoose'

const ThreadSchema= new mongoose.Schema({
   
  name:{
    type:String,
    required:true,
   },
   members: [{
        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
    }]},
       {
   timestamps:true
   }
  )
const Thread=mongoose.model('Thread',ThreadSchema)
export default Thread;