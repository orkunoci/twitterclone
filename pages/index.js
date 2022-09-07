
import { useEffect, useState } from "react"
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
    <div>hello you are looged in {userInfo.user.userName}</div>
  )
}
