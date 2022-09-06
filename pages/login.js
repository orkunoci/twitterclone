import React from 'react'
import {getProviders, signIn, useSession} from 'next-auth/react'
import { useRouter } from 'next/router';
export default function Login({providers}) {
const {data,status} =useSession();
const router =useRouter()
if(status === 'loading'){
  return '';
}
else if( data){
  router.push('/')
}
  return (
    <div className='flex items-center justify-center h-screen '>{providers && Object.values(providers).map(provider=>(
      <div key={provider.id}>
      <button onClick={ async ()=>{await signIn(provider.id)}} className='bg-twitterWhite pl-3 pr-5 py-2 text-black rounded-full flex items-center'>
      <img src='/googleIcon.png' className='h-8'></img> 
      Sign In with {provider.name}
      </button>
      </div>
    ))}</div>
  )
}




export async function getServerSideProps(){
  const providers = await getProviders();
  return{
    props:{providers},
  }
}