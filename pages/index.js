
import axios from "axios";
import { useEffect, useState } from "react"
import PostContent from "../components/PostContent";
import Postform from "../components/PostForm";
import UsernameForm from "../components/UsernameForm";
import useUserInfo from "../hooks/useUserInfo";
import Layout from "../components/Layout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";
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
return <div className="flex items-center justify-center h-screen"><Spinner/></div>

if(userInfo && !userInfo?.user.username){
  return <UsernameForm/>;
}

if(!userInfo){
  router.push('/login')
  return 'no user info'
}

  return (
    <Layout className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold p-4">Home</h1>
        <Postform onPost={()=>{fetchHomePosts();}}/>
        <div className="">
          {posts.length > 0 && posts.map((post)=>{
            return <div className="border-t border-twitterBorder p-5" key={post._id}>
            {post.parent && (
              <div className="">
                  <PostContent {...post.parent} />
                  <div className="relative h-8 " >
                    <div className="border-l-2 border-twitterBorder h-12 ml-6 -top-4 h-12 absolute"></div>
                  </div>
              </div>
            )}
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
