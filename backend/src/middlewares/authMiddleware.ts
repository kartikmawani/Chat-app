 import { body, validationResult } from 'express-validator';
 import type  {Request,Response,NextFunction} from 'express'
 
  export const validateRegistration=[ 
    body('email').isEmail().withMessage('please provide email'),
    body('password').isLength({min:6}).withMessage('password should be atleast 6 letter long')     
    ,
    (req:Request,res:Response,next:NextFunction)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error.array());
    }
    next()
}
 ]
 





