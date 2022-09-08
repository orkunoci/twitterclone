import axios from "axios"
import { useState } from "react"
import useUserInfo from "../hooks/useUserInfo"

export default function Postorm( ) { 
const {userInfo, status:userInfoStatus} =useUserInfo()
const [text,setText] =useState('')

async function onPostSubmit (e){
e.preventDefault()
await axios.post('/api/posts',{text})}

    if(userInfoStatus === 'loading')
    return ''


    return(

        <form action="" className="mx-5" onSubmit={onPostSubmit}>
        <div className="flex">
          <div className="">
            <div className="rounded-full overflow-hidden w-12">
              <img src={userInfo?.user.image} alt="avatar" />
            </div>
          </div>
          <div className="grow pl-2">
            <textarea value={text} onChange={e=>{setText(e.target.value)}} className='w-full bg-transparent text-twitterWhite' placeholder="What's happening"/>
            <div className="text-right border-t border-twitterBorder pt-2">
            <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">Tweet</button>
            </div>
            
        </div>
        </div>
      </form>
    )

}
