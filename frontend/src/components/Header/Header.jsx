import React from "react";
import { Fragment } from 'react'
import pen from '../../assets/pen.png'
// import dp from '../../assets/dp.jpg'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGOUT } from "../../constants/userConstants";
import { logout } from "../../actions/userActions";
import "./Header.css";
import defaultUser from "../../assets/defaultUser.png"

const navigation = [
  { name: 'Notes', href: '#', current: true }
]

function classNames(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

const Header = ({ setSearch }) => {

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin)         //Accessing state
  const { userInfo } = userLogin;                                   //Getting values using destructuring

  let navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());                               //Logging out
    navigate("/");                                    //Pushing user to home page after Logout
  }

  

  return (
    <>
    
      <Disclosure as="nav" style={{backgroundColor: '#04102d'}}>
      {({ open }) => (
        <>
          <div className="mx-auto z-50 max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="penIconContainer flex flex-shrink-0 items-center">
                  <Link to="/homepage">
                  <img
                    className="block h-8 w-auto lg:hidden ml-12 "
                    src={pen}
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={pen}
                    alt="Your Company"
                  />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link to="/notes" className="notesButton text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Notes
                    </Link>
                  </div>
                  
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className=" relative mx-auto text-gray-600">
                <input className="searchBar border-2 border-gray-300 bg-white h-9 px-5 pr-5 rounded-lg text-sm focus:outline-none"
                  type="search" name="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                <button type="submit" className="absolute right-0 top-0 mt-1 mr-4">
                {/* <svg className="w-6 ml-2" fill="#808080" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 512"><path d="M220.6 130.3l-67.2 28.2V43.2L98.7 233.5l54.7-24.2v130.3l67.2-209.3zm-83.2-96.7l-1.3 4.7-15.2 52.9C80.6 106.7 52 145.8 52 191.5c0 52.3 34.3 95.9 83.4 105.5v53.6C57.5 340.1 0 272.4 0 191.6c0-80.5 59.8-147.2 137.4-158zm311.4 447.2c-11.2 11.2-23.1 12.3-28.6 10.5-5.4-1.8-27.1-19.9-60.4-44.4-33.3-24.6-33.6-35.7-43-56.7-9.4-20.9-30.4-42.6-57.5-52.4l-9.7-14.7c-24.7 16.9-53 26.9-81.3 28.7l2.1-6.6 15.9-49.5c46.5-11.9 80.9-54 80.9-104.2 0-54.5-38.4-102.1-96-107.1V32.3C254.4 37.4 320 106.8 320 191.6c0 33.6-11.2 64.7-29 90.4l14.6 9.6c9.8 27.1 31.5 48 52.4 57.4s32.2 9.7 56.8 43c24.6 33.2 42.7 54.9 44.5 60.3s.7 17.3-10.5 28.5zm-9.9-17.9c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z"/></svg> */}
                </button>
              </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      { userInfo? <img
                        className="h-10 w-10 rounded-full"
                        src={userInfo?.pic}
                        alt=""
                      /> : <img
                      className="h-9 w-9 rounded-full"
                      src={defaultUser}
                      alt=""
                    /> }
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      { userInfo? <Menu.Item className="flex items-center rounded-sm py-1 hover:bg-slate-200">
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            <img className="w-8 ml-2 mr-2 rounded-full " src={userInfo?.pic} alt="" />
                            {userInfo?.name}
                          </a>
                        )}
                      </Menu.Item> : null
                      
                    }
                      {userInfo? <Menu.Item className="flex items-center py-1 hover:bg-slate-200 rounded-sm cursor-pointer">
                        {({ active }) => (
                          <a
                            onClick={logoutHandler}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                          >
                            <svg className="w-5 ml-3 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
                            <p>Sign out</p>
                          </a>
                        )}
                      </Menu.Item> : <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/login"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                          >
                            Log in
                          </a>
                        )}
                      </Menu.Item> }
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href="/notes"
                  className={classNames(
                    item.current ? ' notesButton text-white' : 'text-gray-300 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Link to="/homepage">
              <Disclosure.Button className="notesButton mt-2 text-white' : 'text-gray-300 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium">
                <button className=" text-center w-[90vw] text-white ">Home</button>
              </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>

    </>
  );
};

export default Header;
