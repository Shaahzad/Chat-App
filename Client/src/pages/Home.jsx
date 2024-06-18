import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import {logout, setUser} from "../redux/userslice.js"
const Home = () => {

  const selector = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const fetchDetail = async () => {    
  try {
    const url = "http://localhost:5000/api/userdetail"
    const response = await axios({
      url : url,
      withCredentials : true
    })

    console.log(response)

    dispatch(setUser(response.data.data))

    if(response.data.logout){
      dispatch(logout())
      navigate("/email")
    }
  } catch (error) {
    console.log(error)
  }
  }


  useEffect(()=>{
    fetchDetail()
  },[])



  return (
    <div className='grid grid-cols-[300px,1fr]'>
      <section>
        sidebar
      </section>
      
      <section>
        <Outlet/>
      </section>
      </div>
  )
}

export default Home