import express from 'express';
const Router = express.Router();
 

import registerMiddleware from '../Middleware/register.middleware.js';
import {registerUser,LoginUser} from '../Controller/auth.Controller.js';
Router.post("/register",registerMiddleware,registerUser)
Router.post("/Login",LoginUser)
