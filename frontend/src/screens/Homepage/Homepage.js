import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import write from "../../assets/write.png"
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());                               //Logging out
        navigate("/");                                    //Pushing user to home page after Logout
      }

  return (
    <>
    <div className=" landingContainer mx-auto max-w-2xl py-32 sm:py-44 lg:py-52 px-8 " >
          <div className=" text-center ">
            <div className=" headingContainer flex items-center justify-center ">
            <h1 className=" landingHeading text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
              Keep Documenting!
            </h1>
            <img src={write} alt="" className='notesIcon w-20 mx-4 ' />
            </div>
            <p className=" mt-6 text-lg leading-8 text-gray-600 ">
              Create, edit and update notes and to-do-lists 
            </p>
            <div className=" mt-10 flex items-center justify-center gap-x-6 ">
              <button onClick={logoutHandler} className='rounded-md bg-red-600 px-7 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-red-700 focus-visible: outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ' > Log out </button>
              {/* <Link to="/register" className='rounded-md bg-[#d9aa1e] px-7 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-[#ca9c14] focus-visible: outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' > Sign up </Link> */}
            </div>
          </div>
          </div>
    </>
  )
}

export default Homepage