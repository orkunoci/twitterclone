import mongoose from "mongoose"
import { unstable_getServerSession } from "next-auth";
import { initMongoose } from "../../lib/mongoose"
import Follower from "../../models/Follower";
import User from '../../models/User'
import { authOptions } from "./auth/[...nextauth]";
export default async function handler(req,res){
    await initMongoose();
    const session = await unstable_getServerSession(req,res, authOptions)
    
    if(req.method === 'PUT'){
        const {username} = req.body;
        await User.findByIdAndUpdate(session.user.id,{username})
        res.json('ok')
    }
    if(req.method === 'GET'){

        const {id,username} = req.query
        const user = id  ? await User.findById(id) : await User.findOne({username})
        const follow = await Follower.findOne({
            source:session.user.id,
            destination:user?._id
        })
        res.json({user,follow})
       
    }
}