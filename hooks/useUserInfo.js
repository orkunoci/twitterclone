import { useEffect,useState } from "react";
import { useSession } from "next-auth/react"
export default function useUserInfo( ) { 
    const {data:session, status:sessionStatus} = useSession();
    const [userInfo,setUserInfo] = useState();
const [status,setStatus] = useState('loading');
function getUserInfo(){
  if(sessionStatus === 'loading')
    {return}
  if(!session?.user?.id){
    setStatus('unauthenticated')
    return;
  }
  else{ fetch('/api/users?id=' + session.user.id).then((res)=>{res.json().then((result)=>{setUserInfo(result); setStatus('authenticated')})})}
  
}




useEffect(()=>{
    getUserInfo();
  },[sessionStatus])
  

    return {userInfo,setUserInfo,status}
}