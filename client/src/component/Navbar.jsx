import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';

import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const {isAuthenticated,user}=useSelector((state)=>state.user)
  const dispatch=useDispatch();
  const logo=isAuthenticated ?user?.name?.[0] :'Z';
  const navigate=useNavigate();
  const handleLogOut=()=>{
    toast.success("Logout successfully")
    dispatch(logout());
    navigate("/")

  }
  return (
    <div className='flex w-full items-center md:justify-around justify-between sm:gap-2 md:gap-5 gap-1 sm:px-8 px-2 text-sm text-lt-gray sm:font-medium fixed  z-40 bg-white top-0 border-b shadow-md'>
            <Link to="/">
            <img src="/assets/logo.png" alt="logo" className=' h-14 cursor-pointer' />
            </Link>
            <Link to="/">
            <div className='hover:text-black hover:rounded-full hover:bg-gray-200 py-1 px-3 ease-in-out cursor-pointer md:block hidden'>About</div>

            </Link>
          <Link to="/">
            <div className='hover:text-black hover:rounded-full hover:bg-gray-200 py-1 px-3 ease-in-out cursor-pointer md:block hidden'>Products</div>

          </Link>
          <Link to="/">
            <div className='hover:text-black hover:rounded-full hover:bg-gray-200 py-1 px-3 ease-in-out cursor-pointer md:block hidden'>For teams</div>
</Link>

            <div className='flex-1 relative   rounded-sm md:flex  border-2  border-gray-300 items-center  gap-2  font-medium   hidden'>
              
              <Input type="text" placeholder="Search..." classes="pl-10"/>
                {/* <input type="text" placeholder='Search...' /> */}

            <AiOutlineSearch  size={"1.5rem"} color="gray" className='absolute left-2'/>
            </div>
            {
              isAuthenticated===false ? <div className='flex gap-2'>


            <Link to="/auth/login">
            <button className='text-dk-blue px-3 py-2  rounded-sm ring-[1px] ring-dk-blue bg-lt-blue/20 hover:bg-lt-blue/40 '>Log in</button>
            </Link>
             <Link to="/auth/signin">

             <button className='bg-lt-blue px-3 rounded-sm p-2 text-white hover:bg-sky-600'>Sign up</button>

             </Link>
              </div>:<div className='flex items-center justify-center gap-6  '>
              <Link to="/v1/profile">
              <span className='py-2 px-3 rounded-full bg-sky-600 font-bold text-white text-center uppercase'>{logo}</span> 
              </Link>
            <button className='text-dk-blue px-3 py-2  rounded-sm ring-[1px] ring-dk-blue bg-lt-blue/20 hover:bg-lt-blue/40' onClick={()=>handleLogOut()}>Log out</button>
              </div>
            }
             <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
    </div>
  )
}

export default Navbar