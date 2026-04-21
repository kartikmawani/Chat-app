import {useNavigate} from 'react-router-dom'
import React from 'react'
import './Register.css'
import axios from "axios"
import {useState} from 'react' 
import Login from './Login'
 
 
const Register = () => {
 const navigate=useNavigate()
  const [formData,setFormData]=useState({
    username:'',
    email:'',
    password:''
  })
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})

  }
 const handleSubmit=async(e)=>{
  try{
    e.preventDefault()
    const response= await axios.post('http://localhost:5000/api/register',formData)
    navigate('/Login')

  }
  catch(error){
    console.log(error)
  }
 }
   
  return (
   <>
  
   
    
     <div className='Sign-in'> 
        <form   onSubmit={(handleSubmit)}  >
             
        <div className="email"><label >Email</label>
        <input
         type="text" 
         name="username"
          placeholder="Enter your Username"
          value={formData.username}
          onChange={(handleChange)}
          
          />
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
        <button  type='submit'>Sign IN</button>
         
         


        </form>
  </div>
  </> 
  )
}

export default Register
