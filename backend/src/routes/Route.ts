import express from 'express';
const Router = express.Router();
import axios from 'axios'
import type {Request,Response} from 'express'
 
 

import {validateRegistration} from '../middlewares/authMiddleware.js';
import {registerUser,LoginUser} from '../controllers/authController.js';
Router.post("/register",validateRegistration,registerUser)
Router.post("/Login",LoginUser)
Router.get("/Video", async(req:Request, res:Response) => {
    const searchTerm = "Infotainment";
    const ShortVideo=process.env.API_KEY;
    if (!ShortVideo) {
        return res.status(500).json({ error: "Missing YouTube API key" });
    }

    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                q: searchTerm,
                type: 'video',
                key: ShortVideo,
                maxResults: 20  
            }
        });
        
        res.status(200).json(response.data.items);
    }  catch(error:any) {
        console.error("Full error object:", error); 
        res.status(500).json({ 
            message: "Failed to fetch video data from external API.",
            details: error.response ? error.response.data : error.message
        });
    }
});
export default Router;