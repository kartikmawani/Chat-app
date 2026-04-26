import React from 'react';
import {useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import {MyContext} from '../../Context/UserContext.jsx'

const ChatBody = ({messages}) => {
  const {activeRoom} = useContext(MyContext);
  const UserId = localStorage.getItem('currentUserId');
  const navigate = useNavigate();
  

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header  >
      <div
       className="h-12  border border-green-200 rounded-[1rem]  relative w-full flex flex-col flex-1"   > 
        <p>{activeRoom?.name}</p>
        <button className="absolute right-4 bg-green-500 md:w-1/2 lg:w-1/4 p-4" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
        </div>
      </header>
 
      <div className="message__container">
     {messages.map((message) => {
   
    const isSender = message.sender && message.sender._id.toString() === UserId;
    
    // 2. 🛑 FIX: Explicitly return the result of the ternary operator
    return isSender ? (
        // --- SENDER'S MESSAGE (YOU) ---
        <div className="message__chats" key={message._id}>
            <p className="sender__name">You</p>
            <div className="message__sender">
                <p>{message.message}</p>
            </div>
        </div>
    ) : (
        // --- RECIPIENT'S MESSAGE (OTHER USER) ---
        <div className="message__chats" key={message._id}>
            {/* You should use message.sender.username here */}
            <p className="recipient__name">{message.sender.username || 'hello there'}</p> 
            
            <div className="message__recipient">
                <p>{message.message}</p>
            </div>
        </div>
    );
})}
        
       

        
      </div>
    </>
  );
};

export default ChatBody;