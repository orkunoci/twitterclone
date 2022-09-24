import Avatar from "./Avatar";
import ReactTimeAgo from 'react-time-ago'
import Link from "next/link";
import PostButtons from "./PostButtons";
export default function PostContent({text,author,createdAt,_id,likesCount,likedByMe,commentsCount,big=false,username}) {
 
    const createdAtDate = new Date(createdAt)
    return (
    <div className="">
        <div className="flex w-full">
        <div className="">
        {!!author?.image && (
           <Link href={`/`+author?.userName}>
           <div className='cursor-pointer'>
            <Avatar src={author.image} />
           </div>
           </Link> 
    
        )}
        </div>     
        <div className="pl-2 grow">  
        <div className="">
        <Link href={`/`+author?.userName}>
        <span className="cursor-pointer font-bold pr-1">{author.name}</span> 
        </Link>
        {big && (<br/>)}
        <Link href={`/`+author?.userName}>
        <span className="cursor-pointer text-twitterLightGray">@{author.userName}</span> 
        </Link>
        {createdAt && !big && ( <span className="pl-1 text-twitterLightGray"><ReactTimeAgo date={createdAt} timeStyle='twitter'/></span>)}
        </div>
        {!big && ( <div className="">
        <Link href={`/${author.userName}/status/${_id}`}>

            <div className="w-full cursor-pointer">{text}</div>
      
        </Link>
        <PostButtons id={_id} username={author.userName} likesCount={likesCount} commentsCount={commentsCount} likedByMe={likedByMe}/>
         </div>)}
        
        </div>
        </div>
        {big && (
        <div className="mt-2">
            <Link href={`/${author.userName}/status/${_id}`}>
                {text}
            </Link>
            {createdAt && (  <div className="text-twitterLightGray">
            {(new Date(createdAt)).toISOString().replace('T',' ').slice(0,16).split(' ').reverse().join(' ')}
            </div>
          )}
          <PostButtons id={_id} username={author.userName} likesCount={likesCount} commentsCount={commentsCount} likedByMe={likedByMe}/>
        </div>
            )}
    
     </div>
        )
}