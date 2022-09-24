import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import PostContent from "../../../components/PostContent";
import PostForm from '../../../components/PostForm'
import TopNavigationLink from "../../../components/TopNavigationLink";
import useUserInfo from "../../../hooks/useUserInfo";
export default function PostPage(){

    const router =useRouter()
    const {id} =router.query;
    const [post,setPost] = useState();
    const [replies,setReplies] =useState([])
    const [repliesLikedByMe,setRepliesLikedByMe]=useState()
    const {userInfo} =useUserInfo()
    useEffect(()=>{
        if(!id){return}
        axios.get('/api/posts?id='+id).then(response=> setPost(response.data.post));

        axios.get('/api/posts?parent='+id).then(response =>{
            setReplies(response.data.posts)
            setRepliesLikedByMe(response.data.idsLikedByMe)
        })
        console.log(replies)
    },[id])


    return (<Layout> {!!post?._id && (
    <div className="px-5 py-2">
        <TopNavigationLink/>
        <PostContent {...post} big/>
    </div>)
 
}
{!!userInfo && ( 

    <div className="border-t border-twitterBorder py-5">
        <PostForm onPost={()=>{}} compact placeholder={'Tweet your reply'} parent={id} />
    </div> 
)}  
<div className="">
{replies.length > 0 && replies.map(reply =>  {
return (

    <div key={reply.id} className="p-5 border-t border-twitterBorder">
    <PostContent {...reply} likedByMe={repliesLikedByMe.includes(reply.id)}/>
    </div>
    )

})}
</div>
</Layout>)
}