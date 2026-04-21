import React from 'react'
import Home from './Home.jsx'
import './Login.css'
import axios from "axios"
import {useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import  {MyContext} from '../Context/userContext.jsx'
 

const Login = () => {
  const {login}=useContext(MyContext)
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})

  }
 const handleSubmit=async(e)=>{
  try{
    e.preventDefault()
    const response= await axios.post('http://localhost:5000/api/Login',formData)
    const token=response.data.token;
    const username=response.data.user.username;
    localStorage.setItem('authToken',token);
    localStorage.setItem('User',username);
    login({
      token:token,
      username:username,
    })
      navigate('/Home')  

  }
  catch(error){
    console.log(error)
  }
 }
   
  return (
   <> 
     
     <div className='Log-in'> 
        <form action="/get-form-data" method="post" onSubmit={(handleSubmit)}  >
             
        <div className="email"><label >Email</label>
        <input
         type="text" 
         name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={(handleChange)}
          
          />
        </div>
        <div className="password"><label >Password</label>
        <input
         type="password"
         name="password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={(handleChange)}
          />
        </div>
        <button type="submit">Login</button>
        
         
         


        </form>
  </div>
  </>
  )
 
}

export default Login


{/* 

   */}