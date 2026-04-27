import React, { useState,useContext} from 'react';
import {MyContext} from '../../Context/UserContext.jsx'
import { SendHorizonal } from 'lucide-react';
 
const ChatFooter = ({socket}) => {
  const {roomData}=useContext(MyContext)
  const [message, setMessage] = useState('');

  const handleSubmit= (e) => {
  console.log("IS the click working")
    e.preventDefault();
    if(localStorage.getItem('userName')){
     console.log(message)
      socket.emit('message',{
        threadId:roomData.id,
        members:roomData.members,
        text:message,
        name:localStorage.getItem('username'),
        socketID:socket.id,
      }
      )
      
    
      setMessage('');
    }
    
  };
  return (
     
    <div className="h-full w-full bg-red-50 flex items-center px-8 border-t-2 border-red-200">
  <form className="w-full flex gap-4"
     onSubmit={handleSubmit} 
  >
    <input 
      type="text" 
      className="flex-1 h-14  py-6 px-4 bg-red-100   text-lg border-none  outline-none"
      placeholder="Type your message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button type="submit"  
    className="h-14  mt-1 py-2 px-4 bg-indigo-600 text-white rounded-[0.5rem] font-bold hover:bg-indigo-700">
      <SendHorizonal size={24} />
    </button>
  </form>
</div>
  );
};

export default ChatFooter;