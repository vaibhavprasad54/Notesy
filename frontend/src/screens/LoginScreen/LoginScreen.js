import React, { useEffect, useState } from 'react'
import pen from '../../assets/pen.png'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions'

const LoginScreen = ({history}) => {

  let navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');

    if(userInfo) {
     navigate("/notes");
    }
   }, [navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();                       // We wil use "dispatch" to call user actions

    const userLogin = useSelector(state => state.userLogin )      // This is used to access the state

    const { loading, error, userInfo } = userLogin;               // Destructuring to get loading, error etc from userLogin

    useEffect(() => {
      if(userInfo){
        navigate("/notes");
      }
    }, [navigate, userInfo])
    

   
    // Fetching Data from API on click of Login Button
    const submitHandler = async(e) => {
      e.preventDefault(e);
      
      dispatch(login(email, password));

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
              Log in to your account
            </h2>
          </div>
          {/* {error && <ErrorMessage> {error} </ErrorMessage> } */}
          {/* {loading && <Loading />}                       */}
          <form  className="mt-8 space-y-6">
            {/* <input type="email" name="remember" defaultValue="true" /> */}
            <div className="-space-y-px rounded-md shadow-sm">
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
                  className="relative my-10 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                  autoComplete="current-password"
                  required
                  className="relative my-10 block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value) }
                />
              </div>
            </div>

            <div>
              <Link to="/login"> 
              <button
                onClick={submitHandler}
                type="submit"
                className="group my-4 relative flex w-full justify-center rounded-md border border-transparent bg-[#4F46E5] py-2 px-4 text-sm font-medium text-white hover:bg-[#463ed5] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-gray-300 group-hover:text-white" aria-hidden="true" />
                </span>
                Log in
              </button>
              </Link>

              <div className="log-in flex items-center justify-center">
                <p>Don't have an account ? <span className='text-[#4F46E5]'> <Link to="/register"> Sign up </Link> </span> </p>
              </div>
              
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginScreen