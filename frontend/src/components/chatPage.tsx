import React from 'react';
import ChatBar from './ChatBar.jsx';
import ChatBody from './ChatBody.jsx';
import ChatFooter from './ChatFooter.jsx'
import {useState,useEffect,useContext} from 'react'
import { socket } from '../../src/socket.js';
import {MyContext} from '../../Context/UserContext.jsx'
 
const ChatPage = () => {
   const { Messages, messages } = useContext(MyContext);
  useEffect(()=>{
  const handleMessage=(data)=>{
    Messages(data)
  }
  console.log("we are here");
    socket.on('messageResponse',handleMessage);
    return () => {
            socket.off('messageResponse', handleMessage);
        };

  },[Messages])
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
  
  <div className="flex w-3/4 h-[75vh] bg-white rounded-lg shadow-xl overflow-hidden">
      
      
      <div>
          <ChatBar messages={messages} socket={socket}/>
      </div>

     
      <div className="flex flex-col flex-1 h-full bg-slate-50">
          <div className=" h-[85%] flex-1 overflow-y-auto">
              <ChatBody messages={messages} />
          </div>
          <div >
              <ChatFooter socket={socket} />
          </div>
      </div>
  </div>
</div>
);
}

export default ChatPage;
 