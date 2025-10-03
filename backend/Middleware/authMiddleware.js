 import { body, validationResult } from 'express-validator';
 
 const validateRegistration=[ 
    body('email').isEmail().withMessage('please provide email'),
    body('password').isLength({min:6}).withMessage('password should be atleast 6 letter long')     
    ,
    (req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error.array());
    }
    next()
}
 ]
  export default   validateRegistration;





