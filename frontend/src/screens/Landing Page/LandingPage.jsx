import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import stickyNote from "../../assets/sticky.png"
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';


const LandingPage = () => {

  const userLogin = useSelector((state) => state.userLogin)         //Accessing state
  const { userInfo } = userLogin;

  let navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');

    if(userInfo) {
     navigate("/notes");
    }
   }, [navigate]);

   const dispatch = useDispatch();

   const logoutHandler = () => {
    dispatch(logout());                               //Logging out
    navigate("/");                                    //Pushing user to home page after Logout
  }

  return (
    <>
      { userInfo? <div className=" landingContainer mx-auto max-w-2xl py-32 sm:py-44 lg:py-52 px-8 " >
        <div className=" text-center ">
          <div className=" headingContainer flex items-center justify-center ">
          <h1 className=" landingHeading text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
            Welcome to Notesy!
          </h1>
          <img src={stickyNote} alt="" className='notesIcon w-20 mx-4 ' />
          </div>
          <p className=" mt-6 text-lg leading-8 text-gray-600 ">
            Create, edit and update notes and to-do-lists 
          </p>
          <div className=" mt-10 flex items-center justify-center gap-x-6 ">
            <Link to="/login" className='rounded-md bg-indigo-600 px-7 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible: outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ' > Log in </Link>
            <Link to="/register" className='rounded-md bg-[#d9aa1e] px-7 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-[#ca9c14] focus-visible: outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' > Sign up </Link>
          </div>
        </div>
      </div> : 

          <div className=" landingContainer mx-auto max-w-2xl py-32 sm:py-44 lg:py-52 px-8 " >
          <div className=" text-center ">
            <div className=" headingContainer flex items-center justify-center ">
            <h1 className=" landingHeading text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
              Keep Documenting!
            </h1>
            <img src={stickyNote} alt="" className='notesIcon w-20 mx-4 ' />
            </div>
            <p className=" mt-6 text-lg leading-8 text-gray-600 ">
              Create, edit and update notes and to-do-lists 
            </p>
            <div className=" mt-10 flex items-center justify-center gap-x-6 ">
              <button onClick={logoutHandler} className='rounded-md bg-red-600 px-7 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-red-700 focus-visible: outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ' > Log in </button>
              {/* <Link to="/register" className='rounded-md bg-[#d9aa1e] px-7 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-[#ca9c14] focus-visible: outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' > Sign up </Link> */}
            </div>
          </div>
          </div>

      }
    </>
  )
}

export default LandingPage