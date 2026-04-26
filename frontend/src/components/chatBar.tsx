import React,{useState,useEffect,useContext} from 'react';
import './ChatBar.css';
import  ChatFooter from './ChatFooter.jsx';
import  ChatBody from './ChatBody.jsx';
import {MyContext} from '../../Context/UserContext.jsx'
 import { socket } from '../../src/socket.js';
 import { Plus } from 'lucide-react';
 
const ChatBar = ({messages,socket}) => {
  const {Room,setActiveRoom}=useContext(MyContext)
  const [users,setUsers]=useState([]);
  const [clicked,setClicked]=useState(false)
  const [roomClicked,setRoomClicked]=useState(false)
  const [formData,setFormData]=useState({
  memberName:'',
  roomName:'',
  username:localStorage.getItem('User'),
  token:localStorage.getItem('authToken')
  })
  const [searchRoom,setSearchRoom]=useState("")
  const handleRoomChange=(e)=>{
   setSearchRoom(e.target.value)
  }
  const handleCancel=()=>
  {
  setClicked(false)
  }
  useEffect(()=>{
   const handleNewThread=(newThread)=>{
   setUsers(prevUsers => {
                if (prevUsers.some(t => t._id === newThread._id)) {
                    return prevUsers;
                }
                return [...prevUsers, newThread];
            });
            Room({
   name:newThread.name,
   members:newThread.members,
   id:newThread._id,
   })
    
   }
    
     if(socket){
  socket.on('threadCreated',handleNewThread)
  }
   
    return ()=>{ 
    socket.off('threadCreated', handleNewThread);
    }

  },[socket]);
  const handleRoomClick=(room)=>{
   setRoomClicked(true)
   setActiveRoom(room)
   socket.emit('join_room',room._id)
  }
  const handleClick=()=>{
  setClicked(true)
  }
  const handleChange=(e)=>{
  setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  
  }
  const handleSubmit=(e)=>{
  e.preventDefault()
  if(formData.memberName && formData.roomName){
    console.log("Is socket connected?", socket.connected);
if (!socket.connected) {
    console.error("❌ Socket is not connected! The emit will never happen.");
    return;
}
     socket.emit('formData', formData, (response) => {
       
     
         if (response.success) {
        console.log("✅ Success:", response.thread);
        // ONLY clear the form once we know the server succeeded
        setFormData({ roomName: '', memberName: '' });
        setClicked(false);
    } else {
        // This will tell you EXACTLY which backend check failed
        alert("Error: " + response.message); 
        console.error("❌ Backend Error:", response.message);
    }
            if (response.success) {
                const newThread = response.thread;
                setUsers(prevUsers => {
                    if (prevUsers.some(t => t._id === newThread._id)) {
                        return prevUsers;
                    }
                    return [...prevUsers, newThread];
                });

                console.log('Thread created successfully via callback:', newThread._id);

            } else {
                console.error('Room creation failed:', response.message);
            }
        });
  setClicked(false)
  setFormData((prevFormData)=>({...prevFormData,
  roomName:'',
  memberName:''
  }))
  }
 
  else {
      console.error('Member name and Room name are required.');
    }
  }
  return (
     <div className="w-full h-full flex flex-col p-4">
     <div className="flex items-center gap-2 mb-4">
    <input 
     className="flex-1 h-10"
    type="text"
    placeholder="Search room Name"
    name="name"
    value={searchRoom}
    onChange={handleRoomChange}
    />
      
    <button 
    className="flex-none p-1"
    onClick={handleClick}>
    <Plus size={28}/>
    </button>
    </div>
    {
    clicked && (  
    <div>
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      
      
      <div  className="w-full md:w-1/2 h-1/2 bg-white shadow-2xl p-8 flex flex-col border-l border-gray-200 rounded-3xl">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Create New Room</h2>
    <form onSubmit ={handleSubmit} className="w-full  "> 
    <div   className="flex flex-row gap-2" >
    <input 
    type='text'
    placeholder='member name'
    name='memberName'
    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
    value={formData.memberName}
    onChange={handleChange}
    
    />
     <input 
    type='text'
    placeholder='room name'
    name='roomName'
    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
    value={formData.roomName}
    onChange={handleChange}
    
    />
    </div>
    <div className="flex gap-3 pt-4">
    <button 
    type='submit' 
    className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all"
    >
    Create</button>
    <button 
    type="button"
    onClick={handleCancel}
    className="w-full text-gray-500 font-medium py-2 hover:text-gray-800"
    >Cancel</button>
    </div>
    </form>
    </div> 
    </div>
    </div>
    )
    }
    {users.map((user)=>(<li key={user._id}>
    <div>
    <button
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-[0.98] group"
    onClick={()=>{handleRoomClick(user)}}>{user.name}</button>
    </div>
     
    </li> 
    )
    )}
     
    </div>
  );
};

export default ChatBar;