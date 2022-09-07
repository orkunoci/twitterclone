import mongoose from "mongoose"
import { unstable_getServerSession } from "next-auth";
import { initMongoose } from "../../lib/mongoose"
import User from '../../models/User'
import { options } from "./auth/[...nextauth]";
export default async function handle(req,res){
    await initMongoose();
    const session = await unstable_getServerSession(req,res, options)
    
    if(req.method === 'PUT'){
        const {userName} = req.body;
        await User.findByIdAndUpdate(session.user.id,{userName})
        res.json('ok')
    }
    if(req.method === 'GET'){

        const id = req.query.id
        const user = await User.findById(id)
        res.json({user})
    }
}