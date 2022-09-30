import { unstable_getServerSession } from 'next-auth';
import {initMongoose}from '../../lib/mongoose'
import {authOptions} from './auth/[...nextauth]'
import Follower from '../../models/Follower'
export default async function handler(req,res) {
    await initMongoose();
    const session = await unstable_getServerSession (req,res,authOptions);
    const {destination} =req.body;
    const existingFollow = await Follower.findOne({destination,soruce:session.user.id})
    if(existingFollow){
        await existingFollow.remove();
        res.json(null)
    }else{
        await Follower.create({destination,source:session.user.id})
        res.json('ok')
    }
}