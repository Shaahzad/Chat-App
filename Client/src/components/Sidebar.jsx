import React, { useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import Avatar from "../components/Avatar"
import { useSelector } from 'react-redux';
import EdituserDetail from './EdituserDetail';

const Sidebar = () => {
    const user = useSelector((state)=>state.user)
    const [edituseropen, setEdituseropen] = useState(false)
  return (
    <div className='w-full h-full'>
        <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
            <div>
            <NavLink className={({isActive})=> `cursor-pointer w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded ${isActive && "bg-slate-200"}`} title='Chat'>
            <IoChatbubbleEllipses
            size={25}/>
            </NavLink>

            <div title='Add user' className='cursor-pointer w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded'>
             <FaUserPlus size={25}/>
            </div>
            </div>

            <div className='flex flex-col items-center'>
                <button className='mx-auto' title={user?.name} onClick={()=>setEdituseropen(true)}>
                    <Avatar
                    width={40} height={40} name={user.name} imageUrl={user?.profilePic}/>
                </button>
            <button title='Logout' className='cursor-pointer w-12 h-12 flex justify-center items-center hover:bg-slate-200 rounded'>
                <IoLogOutOutline size={25}/>
            </button>
            </div>
        </div>

{
    edituseropen && <EdituserDetail onClose={()=>setEdituseropen(false)} user={user}/>
}


    </div>
  )
}

export default Sidebar