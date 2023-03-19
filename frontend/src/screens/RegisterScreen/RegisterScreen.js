import React, { useState, useEffect } from 'react'
import pen from '../../assets/pen.png'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { register } from '../../actions/userActions'

const RegisterScreen = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState(" https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80 ");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister;

  const submitHandler = async(e) => {
    e.preventDefault(e);

    if(password !== confirmPassword){
      setMessage("Passwords do not match")
    } else {
      dispatch(register(name, email,password, pic))
    }

  }

  useEffect(() => {
    if(userInfo){
      navigate("/notes");
    }
  }, [navigate, userInfo]);

  //Uploading Image
  const postDetails = (pics) => {
    if(!pics){
      return setPicMessage("Please select an image");
    }
    setPicMessage(null);

    if(pics.type === 'image/jpeg' || pics.type === 'image/png' ) {              //Checking image type
      const data = new FormData();
      data.append('file', pics);                                                // Mandatory methods to post an image to Cloudinary
      data.append('upload_preset', 'Notesy');
      data.append('cloud_name', 'dr79i0t2z');
      fetch('https://api.cloudinary.com/v1_1/dr79i0t2z/image/upload', {         //Fetching image from cloudinary
        method: 'post',
        body: data,
      }).then((res)=>res.json()).then((data)=> {
        console.log(data);
        setPic(data.url.toString());
      }).catch((err)=>{
        console.log(err);                                                      //Catching error
      })
    } else {
        return setPicMessage("Please select an image");                       //Throwing error if selected file is not an image
    }

  }
  

  return (
    <>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{height: '87vh', paddingTop: '0', paddingBottom: '0'}}>
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={pen}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>
          {error && <ErrorMessage> {error} </ErrorMessage> }
          {loading && <Loading />}                      
          {message && <ErrorMessage> {message} </ErrorMessage>}
          <form  className="mt-8 space-y-6">
            {/* <input type="email" name="remember" defaultValue="true" /> */}
            <div className="-space-y-px rounded-md shadow-sm">
            <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative my-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}    //Setting the value in the input field to the current state
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative my-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}    //Setting the value in the input field to the current state
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="relative my-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}    //Setting the value in the input field to the current state
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="cnfPassword"
                  name="cnfPassword"
                  type="password"
                  autoComplete="confirm-password"
                  required
                  className="relative my-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value) }
                />
              </div>
          
              {picMessage && ( <ErrorMessage> {picMessage} </ErrorMessage> ) }
              <div>
                <input
                  className="relative m-0 block w-full flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1 text-sm font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                  id="formFileSm"
                  type="file"
                  onChange={(e) => postDetails(e.target.files[0]) }                 //Function to select/upload file
                   />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <Link to="/login"> 
              <button
                onClick={submitHandler}
                type="submit"
                className="group my-4 relative flex w-full justify-center rounded-md border border-transparent bg-[#4f46e5] py-2 px-4 text-sm font-medium text-white hover:bg-[#4139c8] focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-gray-300 group-hover:text-white" aria-hidden="true" />
                </span>
                 Register
              </button>
              </Link>

              <div className="log-in flex items-center justify-center">
                <p>Already have an account ? <span className='text-[#4f46e5]'> <Link to="/login"> Sign in </Link> </span> </p>
              </div>
              
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterScreen