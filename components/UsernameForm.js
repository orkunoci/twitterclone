import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUserInfo from "../hooks/useUserInfo";

export default function UsernameForm() {

    const {userInfo,status:sessionStatus}=useUserInfo()
    const [userName,setuserName] =useState('');
    const router = useRouter()
    useEffect(() => {
        
    if(sessionStatus === 'loading'){
    return;
    }
    if(userName === ''){
        const defaultuserName = userInfo?.user.email?.split('@')[0];
        setuserName(defaultuserName?.replace(/[^a-z]+/gi,''))
    }


    },[sessionStatus])

     async function handleFormSubmit(e){
        e.preventDefault()
        await fetch('/api/users',{
            method:'PUT',
            headers:{'content-type':'application/json'},
            body: JSON.stringify({userName})
        })
        router.reload()
    }



    if(sessionStatus === 'loading'){
    return ''
    }
    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={handleFormSubmit} className="text-center">
                <h1 className="text-xl mb-2">Pick a User Name</h1>
                <input type='text'  onChange={e => {setuserName(e.target.value)}}  value={userName} placeholder="User Name" className="block mb-2 bg-tiwtterBorder px-3 py-1 rounded-full" />
                <button className="block bg-twitterBlue w-full rounded-full py-1">Continue</button>
            </form>
        </div>
    )
}