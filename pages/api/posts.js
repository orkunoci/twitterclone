import mongoose from "mongoose"
import { unstable_getServerSession } from "next-auth";
import { initMongoose } from "../../lib/mongoose"
import Post from '../../models/Post'
import Like from '../../models/Like'
import { authOptions } from "./auth/[...nextauth]";
import Follower from "../../models/Follower";
export default async function handler(req,res){
    await initMongoose();
    const session = await unstable_getServerSession(req,res, authOptions)
    
    if(req.method === 'GET'){
        const {id} = req.query;
        if(id){
            const post = await Post.findById(id).populate('author');
            res.json({post})
        }else{
            const parent = req.query.parent || null;
            const author = req.query.author;
            let searchFilter;
            if(!author && !parent){
                const myFollows = await Follower.find({source:session.user.id,}).exec()
                const idsOfPeopleIFollow = myFollows.map(f=>f.destination)
                searchFilter={author:[...idsOfPeopleIFollow,session.user.id]}
            }
            if(author){
                searchFilter = {author}
            }
            if(parent){
                searchFilter= {parent}
            }
            const posts = await Post.find({parent}).populate('author').sort({createdAt: -1}).limit(20).exec()
            const postsLikedByMe= await Like.find({author:session?.user.id,post:posts.map(p=>p._id)})
            const idsLikedByMe=postsLikedByMe.map(like=>like.post);
            res.json({posts,idsLikedByMe:[],})
        }
    }

    if(req.method === 'POST' ){
        const {text,parent} =req.body;
        const post = await Post.create({
            author:session.user.id,
            text,
            parent
        })
        if(parent){
            const parentPost = await Post.findById(parent)
            parentPost.coummentsCount = await Post.countDocuments({parent});
            await parentPost.save();
        }
        res.json(post)
    }
}