import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { IoImage } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import upload from '../Helper/upload';


const Message = () => {
  const params = useParams()
  const socketconnection = useSelector((state)=> state.user.socketconnection)
  const user = useSelector((state)=> state.user)
  const [imagevideoshow, setImagevideoshow] = useState(false)
  const [message,setmessage] = useState({
    text : "",
    imageUrl : "",
    videoUrl : ""
  })
  const [datauser, setDatauser] = useState({
    name : "",
    profilePic : "",
    email : "",
    onlineuser : false,
    _id : ""
  })


  const Handeluploadimagevideo = () => {
    setImagevideoshow(prev => !prev)
  }

  const Handeluploadimage = async(e) => {
    const file = e.target.files[0]

    const uploadphoto = await upload(file)


    setmessage((prev)=>{
      return{
        ...prev,
        imageUrl : uploadphoto?.url
      }
    })
    

  }

  const Handeluploadvideo = async(e) => {
    const file = e.target.files[0]

    const uploadphoto = await upload(file)


    setmessage((prev)=>{
      return{
        ...prev,
        videoUrl : uploadphoto?.url
      }
    })
    

  }


  useEffect(() => {
     if(socketconnection){
      socketconnection.emit("message-page", params.userId)

      socketconnection.on("message-user", (data) => {
        setDatauser(data)
      })
     }
  }, [socketconnection,params.userId,user])
  return (
    <div>
      <header className='sticky top-0 bg-white h-16 flex justify-between items-center px-4'>
         <div className='flex items-center gap-3'>
          <Link to={"/"} className='lg:hidden'>
           <FaAngleLeft size={25}/>
          </Link>
          <div className='mt-2'>
            <Avatar
            width={40}
            height={40}
            imageUrl={datauser.profilePic}
            name={datauser.name}
            userId={datauser._id}
            />
          </div>
          <div>
            <h1 className='font-semibold text-lg my-0'>{datauser.name}</h1>
            <p className='-my-2 text-sm'>{datauser.onlineuser ? <span className='text-primary'>Online</span> : <span className='text-slate-400'>Offline</span>}</p>
          </div>
         </div>
         <div>
          <button className='cursor-pointer hover:text-primary'>
          <HiDotsVertical/>
          </button>
         </div>
      </header>


      {/* ///////show message here////////// */}
      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scroll'>
        {
          message.imageUrl && (
            <div className='w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center'>
            <div className='bg-white p-3'>
             <img src={message.imageUrl} alt="" width={300} height={300}/>
            </div>
             </div>
          )
        }
      </section>

      {/* ////////send message here//////// */}
      <section className='h-16 bg-white flex items-center px-4'>
       <div className='relative'>
        <button onClick={Handeluploadimagevideo} className='flex justify-center items-center w-14 h-14 rounded-full hover:bg-primary hover:text-white'>
         <FaPlus size={20} />
        </button>

        {/*video & image*/}
         {
          imagevideoshow &&(
            <div className='bg-white shadow rounded absolute bottom-1 w-36 p-2'>
            <form>
              <label htmlFor='uploadimage' className='flex items-center gap-2 p-2 hover:bg-slate-200 cursor-pointer'>
                <div className='text-primary'>
                   <IoImage/>
                </div>
                <p>Image</p>
              </label>
              <label htmlFor='uploadvideo'  className='flex items-center gap-2 p-2 hover:bg-slate-200 cursor-pointer'>
                <div className='text-purple-500'>
                   <FaVideo/>
                </div>
                <p>video</p>
                </label>
                <input type="file" id='uploadimage' onChange={Handeluploadimage}/>
                <input type="file" id="uploadvideo" onChange={Handeluploadvideo}/>
            </form>
          </div>
          )
         }


       </div>
      </section>
      </div>
  )
}

export default Message