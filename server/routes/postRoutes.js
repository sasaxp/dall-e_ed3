import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import Post from '../mongodb/models/post.js';

dotenv.config();
const router= express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})

router.route('/').get(async(req,res)=>{
    try {
        const posts= await Post.find({});
        res.status(200).json({success:true,data: posts})
    } catch(error) {
        res.status(500).json({success:false,message: error})
    }
});

router.route('/').post(async(req,res)=>{
    try{
        const{name, prompt, photo}= req.body;
        const photoUrl= await cloudinary.uploader.upload(photo);
        const newPost= await Post.create({
        name,
        prompt,
        photo:photoUrl.url
    })
        res.status(201).json({success:true, data:newPost});
    }
    catch(error){
        res.status(500).json({success:false, message:error})
    }
});

router.route('/:id').delete(async(req,res)=>{
    const { id } = req.params;
    try{
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'No post found with this ID' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch(error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})
export default router;


