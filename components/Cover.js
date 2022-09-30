import { useState } from "react";
import { FileDrop } from "react-file-drop";
import EditableImage from "./Editable";
import Spinner from "./Spinner";

export default function Cover({src,onChange,editable}) {
 
    return(
        <EditableImage type={'cover'} src={src} onChange={onChange} editable={editable} className={'h-36'} />
    )

}