import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Avatar from "../components/Avatar"
import Cover from "../components/Cover"
import Layout from "../components/Layout"
import PostContent from "../components/PostContent"
import TopNavigationLink from "../components/TopNavigationLink"
import useUserInfo from '../hooks/useUserInfo'

export default function UserPage() { 
    const [profileInfo,setProfileInfo]=useState()
    const [posts,setPosts]=useState()
    const [editMode,setEditMode] = useState(false)
    const [postsLikedByMe,setPostsLikedByMe] =useState()
    const [originalUserInfo,setOriginalUserInfo]=useState()
    const [isFollowing,setIsFollowing] =useState(false)
    const router = useRouter()
    const {userInfo} = useUserInfo();
    const {username} =router.query
    useEffect(()=>{
        axios.get('/api/users?username='+username).then(response=>{
            setProfileInfo(response.data.user)
            setOriginalUserInfo(response.data.user)
            setIsFollowing(!!response.data.follow)
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
    function updateUserImage(type,src){
        console.log({type,src})
        setProfileInfo(prev=>({...prev,[type]:src}))
    }

    async function updateProfile(){
        const {bio,name,username}=profileInfo;
        axios.put('/api/profile',{
            bio,name,username
        })
        setEditMode(false)
    }
  
    function cancel(){
        setProfileInfo(prev=>{
            const {bio,name,username}= originalUserInfo
            return{...prev,bio,username,name}
        })
        setEditMode(false)
    }

    function toggleFollow(){
        setIsFollowing(prev=>!prev)
        axios.post('/api/followers',{
            destination: profileInfo._id
        })
    }


const isMyProfile =profileInfo?._id === userInfo?.user?._id;

return(
    <Layout>
        
       {!!profileInfo && (
            <div>
               <div className="px-5 pt-2">
                     <TopNavigationLink title={profileInfo?.name}/>         
                 </div>
                 <Cover src={profileInfo?.cover} 
                 editable={isMyProfile}
                 onChange={src => updateUserImage('cover',src)}/>
                 <div className="flex justify-between">
                        <div className="ml-5 relative">
                                <div className="absolute -top-12 border-4 overflow-hidden rounded-full border-black">
                                <Avatar big onChange={src => updateUserImage('image',src)} editable={isMyProfile} src={profileInfo?.image}/>
                                </div>    
                        </div>
                        <div className="p-2">
                                {!isMyProfile && (
                                    <div>
                                    <button onClick={toggleFollow} className={(isFollowing ?'bg-twitterWhite text-black hover:bg-red-500' :'bg-twitterBlue') + " text-white py-2 px-5 rounded-full"}>
                                        {isFollowing ? 'Following':'Follow'}
                                    </button>

                                    </div>
                                )}

                                {isMyProfile && (
                                    <div className="">
                                    {!editMode && (
                                        <button  onClick={()=>{setEditMode(true)}}  className="bg-twitterBlue text-white py-2 px-5 rounded-full">Edit My Profile</button>
                                    )}
                                    {editMode && (
                                            <div className="">
                                            <button  onClick={()=>cancel()}  className="bg-twitterBlue text-white py-2 px-5 rounded-full mr-2">Cancel</button>
                                            <button  onClick={()=>updateProfile()}  className="bg-twitterBlue text-white py-2 px-5 rounded-full">Save Profile</button>
                                            </div>
                                    )}

                                    </div>

                            )}
                        </div>
                        
                 </div>
                <div className="px-5 mt-4">
                            {!editMode && (
                                <h1 className="font-bold text-xl leading-5">{profileInfo?.name}</h1>
                            )}
                            {editMode && (
                                <div className="">
                                    <input type="text" value={profileInfo?.name} onChange={e=>setProfileInfo(prev=>({...prev,name:e.target.value}))} className='bg-twitterBorder p-2 mb-1 rounded-full' />
                                </div>
                            )}
                            {!editMode && (
                                <h2 className="text-twitterLightGray text-sm">@{profileInfo?.username}</h2>
                            )}
                            {editMode && (
                                <div className="">
                                    <input type="text" value={profileInfo?.username} onChange={e=>setProfileInfo(prev=>({...prev,username:e.target.value}))} className='bg-twitterBorder p-2 mb-1 rounded-full' />
                                </div>
                            )}
                            {!editMode && (
                                <div className="mt-2 text-sm mb-2">{profileInfo.bio}</div>
                            )}
                            {editMode && (
                                <textarea value={profileInfo?.bio} onChange={e=>setProfileInfo(prev=>({...prev,bio:e.target.value}))} className='bg-twitterBorder p-2 rounded-2xl mb-2 w-full block'></textarea>
                            )}
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