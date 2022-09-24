import mongoose from "mongoose"
import { unstable_getServerSession } from "next-auth";
import { initMongoose } from "../../lib/mongoose"
import User from '../../models/User'
import { authOptions } from "./auth/[...nextauth]";
export default async function handler(req,res){
    await initMongoose();
    const session = await unstable_getServerSession(req,res, authOptions)
    
    if(req.method === 'PUT'){
        const {userName} = req.body;
        await User.findByIdAndUpdate(session.user.id,{userName})
        res.json('ok')
    }
    if(req.method === 'GET'){

        const {id,username} = req.query
        const user = id ? await User.findById(id) : await User.findOne({username})
        res.json({user})
    }
}