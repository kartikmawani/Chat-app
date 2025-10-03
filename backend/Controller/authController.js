import bcrypt from 'bcrypt';
import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';
 

 const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
export const registerUser=asyncHandler(async(req,res)=>{
     
const {password,email}=req.body

const existedUser=await User.findOne({email})

if(existedUser){
     return res.status(409).json({message:'user already exist'})

}
const newPassword= await bcrypt.hash(password,10)

const newUser=new User({
    email:email,
    password:newPassword,
})
await newUser.save()
res.status(201).json({message:"user registered succesfully"});
})
  
 export const LoginUser=asyncHandler(async(req,res)=>{
    try{
     const {email,password}=req.body
     const UserEmail=await User.findOne({email})
     if(!UserEmail){
        return res.status(400).json({message:"Invalid credentials"})
     }
     const UserPassword=await bcrypt.compare(password,UserEmail.password)
      if(!UserPassword){
        return res.status(400).json({message:"Invalid credentials"})
     }
     const token=jwt.sign(
        
           {id:UserEmail._id,
          email:UserEmail.email},
           process.env.JWT_SECRET,
           {expiresIn:'24h'}
           
       
 )
    return res.status(200).json({ 
         message:'Login Succesfull',
         token,
         user:{id:UserEmail._id,
            email:UserEmail.email
         }

    });
   

    }
    catch(error){
        res.status(400).json({message:"payload error"})

    }
});
