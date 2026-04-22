import mongoose from 'mongoose'

const ChatSchema= new mongoose.Schema({
 thread:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Thread'
  },
  message:{
   type:String,
  required:true,
  },
  sender: {
  type: mongoose.Schema.Types.ObjectId, 
   ref: 'User',
   required: true 
   },
}, {
  timestamps:true,
  })

 const Chat=mongoose.model('Chat',ChatSchema)
 export default Chat;