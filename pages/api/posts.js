import mongoose from "mongoose"
import { unstable_getServerSession } from "next-auth";
import { initMongoose } from "../../lib/mongoose"
import Post from '../../models/Post'

import { options } from "./auth/[...nextauth]";
export default async function handler(req,res){
    await initMongoose();
    const session = await unstable_getServerSession(req,res, options)
    
    if(req.method = 'POST' ){
        const {text} =req.body;
        const post = await Post.create({
            author:session.user.id,
            text,
        })
        res.json(post)
    }
}