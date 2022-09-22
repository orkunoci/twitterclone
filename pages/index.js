
import axios from "axios";
import { useEffect, useState } from "react"
import PostContent from "../components/PostContent";
import Postorm from "../components/PostForm";
import UsernameForm from "../components/UsernameForm";
import useUserInfo from "../hooks/useUserInfo";
import Layout from "../components/Layout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
export default function Home() {
  const [posts,setPosts] = useState([]);
  const {userInfo,setUserInfo,status: userInfoStatus} = useUserInfo()
  const [idsLikedByMe,setIdsLikedByMe]=useState()
  const router =useRouter()
  function fetchHomePosts(){
    axios.get('/api/posts').then((res)=> {
      setPosts(res.data.posts);
      setIdsLikedByMe(res.data.idsLikedByMe)
    }
    )

  }

  async function logout(){
    setUserInfo(null)
    await signOut();
  }

  useEffect(()=>{
    fetchHomePosts();
  },[]) 

 
if(userInfoStatus === 'loading')
return 'user info loading'

if(userInfo && !userInfo?.user.userName){
  return <UsernameForm/>;
}

if(!userInfo){
  router.push('/login')
  return 'no user info'
}

  return (
    <Layout className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold p-4">Home</h1>
        <Postorm onPost={()=>{fetchHomePosts();}}/>
        <div className="">
          {posts.length > 0 && posts.map((post)=>{
            return <div className="border-t border-twitterBorder p-5" key={post._id}>
           <PostContent {...post} likedByMe={idsLikedByMe.includes(post._id)}/>
            </div>
          })}
        </div>
     {userInfo && (   
      <div className="p-5 text-center border-top border-twitterBorder">
        <button onClick={logout} className="bg-twitterWhite text-black px-5 py-2 rounded-full">Log Out</button>
      </div>
 )}
    </Layout>
  )
}
