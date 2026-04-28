import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatPage from './ChatPage.jsx'
import {socket} from '../../src/socket.js'
 const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    const authToken = localStorage.getItem('authToken'); 
    
    if (authToken) { 
       socket.auth.token = authToken; 
        
        // 2. Explicitly connect the socket (this is your connection attempt)
        socket.connect();
        // 🚀 CORRECT: These lines are now inside the 'if' block where 'socket' is defined.
        socket.emit('newUser', { userName: userName, socketID: socket.id });
        socket.emit('authenticate', { userName });
        navigate('/Chat');
    } else {
        // Handle case where token is missing (e.g., redirect to login)
        console.error("Missing authentication token. Cannot establish chat connection.");
        alert("Please log in to chat.");
        // Optional: navigate('/login')
    }
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;