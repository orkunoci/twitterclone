import { useState } from "react";
import { FileDrop } from "react-file-drop";
import Spinner from "./Spinner";
export default function EditableImage({editable=false,type,src,onChange,className}) {

    const [fileNear,setFileNear] =useState(false)
const [isFileOver,setIsFileOver] =useState(false)
const [isUploading,setIsUploading]=useState(false)

let extraClasses = '';
if(fileNear && !isFileOver) extraClasses +=  ' bg-blue-500 opacity-30'
if(isFileOver) extraClasses += ' bg-blue-500 opacity-90'
if(!editable) extraClasses= '';

function updateImage(files,e){
    setFileNear(false);
    setIsFileOver(false);
    
    e.preventDefault();
    const data =new FormData();
    data.append(type,files[0]);
    
    setIsUploading(true)
    
    fetch('/api/upload',{
            method:'POST',
            body:data,
        }).then(async response =>{
            const json = await response.json();
            onChange(json.src)
            setIsUploading(false)
        
        })
}


return(
    <FileDrop
    onDrop={updateImage} 
    onDragOver={()=>{setIsFileOver(true)}}
    onDragLeave={()=>{setIsFileOver(false)}}
    onFrameDragEnter={()=> setFileNear(true)} 
    onFrameDragLeave={()=> setFileNear(false)}
>
 <div className={"relative text-white "}>
            <div className={"absolute inset-0 "+extraClasses}></div>
                 {isUploading &&
                         (<div className="absolute inset-0 flex items-center justify-center "><Spinner/></div>)
                 }
             
                    <div className={"cover flex items-center overflow-hidden "+className}>
                        <img src={src} className='w-full' alt="" />
                    </div>
           
</div>
</FileDrop>

)




}







