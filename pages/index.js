
import { useEffect, useState } from "react"
import Postorm from "../components/PostForm";
import UsernameForm from "../components/UsernameForm";
import useUserInfo from "../hooks/useUserInfo";

export default function Home() {

  const {userInfo,status: userInfoStatus} = useUserInfo()

 
if(userInfoStatus === 'loading')
return 'user info loading'

if(!userInfo?.user.userName){
  return <UsernameForm/>;
}

  return (
    <div className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold p-4">Home</h1>
        <Postorm/>
    </div>
  )
}
