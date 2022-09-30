import axios from "axios"
import { useState } from "react"
import useUserInfo from "../hooks/useUserInfo"
import Avatar from "./Avatar"

export default function Postform({onPost,parent,compact,placeholder='What\'s Happening'}) { 
const {userInfo, status:userInfoStatus} =useUserInfo()
const [text,setText] =useState('')

async function onPostSubmit (e){
e.preventDefault()
await axios.post('/api/posts',{text,parent})

setText('')
if(onPost){
  onPost();
}
}

    if(userInfoStatus === 'loading')
    return ''


    return(

        <form action="" className="mx-5" onSubmit={onPostSubmit}>
        <div className={(compact ? ' items-center ': '')+ " flex "}>
          <div className="">
            <Avatar src={userInfo?.user.image}/>
          </div>
          <div className="grow pl-2">
            <textarea value={text} onChange={e=>{setText(e.target.value)}} className={ (compact ? ' h-10 mt-1 ' : ' h-24 ' ) +' w-full bg-transparent text-twitterWhite'} placeholder={placeholder}/>
            {!compact && (
              <div className="text-right border-t border-twitterBorder pt-2">
              <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">Tweet</button>
              </div>
              

            )}
            
          </div>
              {compact && (  
                  <div className="pl-2">
                  <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">Tweet</button>
                  </div>
                  )}
        </div>
      </form>
    )

}
