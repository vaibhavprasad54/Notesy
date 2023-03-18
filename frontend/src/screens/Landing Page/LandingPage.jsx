import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import stickyNote from "../../assets/sticky.png"
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {

  let navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');

    if(userInfo) {
     navigate("/notes");
    }
   }, [navigate]);

  return (
    <>
      <div className=" mx-auto max-w-2xl py-32 sm:py-44 lg:py-52 " >
        <div className=" text-center ">
          <div className="flex items-center justify-center ">
          <h1 className=" text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
            Welcome to Notesy!
          </h1>
          <img src={stickyNote} alt="" className=' w-20 mx-4 ' />
          </div>
          <p className=" mt-6 text-lg leading-8 text-gray-600 ">
            Create, edit and update notes and to-do-lists 
          </p>
          <div className=" mt-10 flex items-center justify-center gap-x-6 ">
            <Link to="/login" className='rounded-md bg-indigo-600 px-7 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible: outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ' > Log in </Link>
            <Link to="/register" className='rounded-md bg-indigo-600 px-7 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible: outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' > Sign up </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage