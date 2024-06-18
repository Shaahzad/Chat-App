import React from 'react'
import { FaUserCircle } from 'react-icons/fa'



const Avatar = ({userId,name,imageUrl,width,height}) => {


    let Avatarname = ""

    if(name){
         const splitname = name.split(" ")


         if(splitname.length > 1){
            Avatarname = splitname[0][0] + splitname[1][0]
         }else{
            Avatarname = splitname[0][0]
         }
    }
    

    const bgcolor = [
        'bg-slate-800',
        'bg-teal-700',
        'bg-green-600',
        'bg-red-500',
        'bg-yellow-400',
        'bg-pink-500',
        'bg-purple-500',
        'bg-indigo-500',
        'bg-blue-500',
        'bg-gray-500',
    ]

    const randomNumber = Math.floor(Math.random() * bgcolor.length)
    console.log(randomNumber)

  return (
    <div className={`text-slate-800 overflow-hidden rounded-full font-bold`}  style={{width: width+"px", height: height+"px"}}>
{
    imageUrl ? 
    <img
    src={imageUrl}
    alt={name}
    width={width}
    height={height}
    className='overflow-hidden rounded-full'
     />
    :

    name ? 
    <div style={{width: width+"px", height: height+"px"}} className={`overflow-hidden rounded-full flex justify-center items-center  ${bgcolor[randomNumber]}`}>
{Avatarname}
    </div>
    :

    <FaUserCircle size={width}/>

    
}
    </div>
  )
}

export default Avatar