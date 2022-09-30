import EditableImage from "./Editable"

export default function Avatar({src,big,onChange,editable=false}) {
    const widthClass = big ? 'w-24 h-24':'h-12 w-12'
    return(
        <EditableImage src={src} onChange={onChange} type={'image'} editable={editable} className={'rounded-full overflow-hidden '+ widthClass}/>
    )

}

//  <div className={'rounded-full overflow-hidden '+widthClass}>
//             <img src={src} alt="avatar" />
    //   </div>