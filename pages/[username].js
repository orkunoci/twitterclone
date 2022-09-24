import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Avatar from "../components/Avatar"
import Cover from "../components/Cover"
import Layout from "../components/Layout"
import PostContent from "../components/PostContent"
import TopNavigationLink from "../components/TopNavigationLink"

export default function UserPage() { 
    const [profileInfo,setProfileInfo]=useState()
    const [posts,setPosts]=useState()
    const [postsLikedByMe,setPostsLikedByMe] =useState()
    const router = useRouter()
    const {username} =router.query
    console.log(username)
    useEffect(()=>{
        axios.get('/api/users?username='+username).then(response=>{
            setProfileInfo(response.data.user)
        })
        
    },[username])
    useEffect(()=>{
        if(!profileInfo?._id){
            return
        }
        axios.get('/api/posts?author='+profileInfo._id).then(response=> {
            setPosts(response.data.posts)
            setPostsLikedByMe(response.data.idsLikedByMe)
        })

    },[profileInfo])
return(
    <Layout>
        
       {!!profileInfo && (
            <div>
               <div className=  "px-5 pt-2">
                     <TopNavigationLink title={profileInfo.name}/>         
                 </div>
                 <Cover/>
                 <div className="flex justify-between">
                        <div className="ml-5 relative">
                                <div className="absolute -top-14 border-4 rounded-full border-black">
                                <Avatar big src={profileInfo.image}/>
                                </div>    
                        </div>
                        <div className="p-2">
                            <button className="bg-twitterBlue text-white py-2 px-5 rounded-full">Follow</button>
                            <button></button>
                        </div>
                        
                 </div>
                <div className="px-5 mt-2">
                            <h1 className="font-bold text-xl leading-5">{profileInfo.name}</h1>
                            <h2 className="text-twitterLightGray text-sm">@{profileInfo.userName}</h2>
                            <div className="mt-2 text-sm mb-2">bio</div>
                </div>
            </div>
       )}

       {posts?.length > 0 && posts.map((post)=>{
        return (

            <div className="p-5 border-t border-twitterBorder" key={post._id}>
            <PostContent {...post} likedByMe={postsLikedByMe.includes(post._id)}/>
            </div>
            )
       })}
    </Layout>
)

}