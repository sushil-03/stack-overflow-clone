import React,{useEffect, useState} from 'react'
import Input from '../Input'
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { clearError, login } from '../../actions/userAction';
import Loading from '../Loading';

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {auth} from "../../firebase"
import { ToastContainer, toast } from "react-toastify";
const LogIn = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [phone,setPhone]=useState("")
    const [pass,showPass]=useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [otpInput,showOTPInput]=useState(false);
    const [otp, setOtp] = useState("");
    const {isLoading,isAuthenticated,error}=useSelector((state)=>state.user)
    
    useEffect(()=>{
        if(isAuthenticated){
            console.log('jappepepepe');
            toast.success("User login successfully")
            console.log('qne');
            navigate("/");
        }
        if(error){
            toast.error(error)
            dispatch(clearError());
        }
    },[dispatch, error, isAuthenticated, navigate])

const handleSubmit=(e)=>{
    e.preventDefault();

    if(!email){
        toast.error("Email cannot be empty");
        dispatch(clearError())
        return ;
    }
    if(otpInput && otp!==""){
        if(!window.confirmationResult){
            toast.error("Please try again after some time..");
            return;
        }
        window.confirmationResult.confirm(otp).then((res)=>{
            dispatch(login(email,"",true))
        }).catch(er=>{
            toast.error("OTP DOESN'T MATCH")
        })
    }else{
        dispatch(login(email,password))
    }
}

if(isLoading){
    return <Loading/>
}
const handleOTP=async()=>{
    const phoneNumber = phone
    const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );
      recaptchaVerifier.render();


    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => { 
            window.confirmationResult = confirmationResult;
        }).catch((error) => {
            toast.alert("Too Many Request . Please try after some time.")
        });
}

  return (
    <div className='mt-14 bg-gray-200/40 h-screen  grid place-items-center font-sans overflow-hidden relative transition-all ease-in-out'>
            <div className='xl:w-1/4 lg:w-1/3 md:w-1/3 mx-auto border-2 overflow-hidden rounded-md shadow-xl t-14 bg-white text relative'>
                    <form action="" >
                    <div className=' py-3 px-6 relative'>
                        <label htmlFor="email" className='font-bold'>Email </label>
                        <div className={`border-2 border-gray-300 rounded-md mt-1`}>
                            <Input type="email" id="email" name="email"  placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                    </div>
                    </form>
                    <div>

                    <div className=' pt-2 pb-6 px-6 relative'>
                        <label htmlFor="password" className='font-bold '>Password </label>
                        <div className={`border-2 border-gray-300  rounded-md mt-2 relative`}>
                            <Input type={`${pass===false ?"password":"text"}`} id="password" classes="pr-10" name="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <div className='absolute right-2 text-xl mt-2 bottom-2' onClick={()=>showPass(!pass)}>

                            {
                                pass ?  <AiOutlineEyeInvisible />:<AiOutlineEye  />
                            }

                            </div>
                        </div>
                    </div>
                    <div className=' w-5/6 flex mx-auto my-2 relative items-center gap-2'>
                        <div className='h-[2px] bg-gray-200 w-full'></div>
                        <span className=''>or</span>
                        <div className='h-[2px] bg-gray-200 w-full'></div>
                    </div>
                    <div className='mx-6 py-6  relative t'>
                        <p className='text-center cursor-pointer text-sm bg-gray-200 w-full p-2' onClick={()=>showOTPInput(!otpInput)}>Get an OTP on your phone</p>
                    </div>
                    <div className={`${otpInput===true?"block":"hidden"}`}>
                    <div className='  pb-2 px-6 relative'>
                        <label htmlFor="phone" className='font-bold '>Phone </label>
                        <div className={`border-2 border-gray-300  rounded-md  relative`}>
                            <Input type="text" id="phone" classes="pr-10" name="phone" placeholder="+91 .... .... " value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                            <div className='absolute right-0 text-lg bg-sky-400 px-1 top-0 bottom-0  rounded-sm border-sky-500 border-2 text-white cursor-pointer' onClick={()=>handleOTP()}>
                            SEND
                            </div>
                        </div>
                    </div>
                    <div className='  pb-6 px-6 relative'>
                        <label htmlFor="otp" className='font-bold '>OTP </label>
                        <div className={`border-2 border-gray-300  rounded-md  relative`}>
                            <Input type="number" id="otp" classes="w-full pr-10" name="otp" placeholder="OTP" value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                        </div>
                    </div>
                    <div  id="recaptcha-container" className="justify-center flex mx-4 ml-6 w-4/5">
                        
                    </div>

                    </div>
                    </div>
                    
                    <button type="submit" className='bg-lt-blue  rounded-sm p-2 text-white hover:bg-sky-600 w-5/6 block mx-auto my-4 font-semibold' onClick={(e)=>handleSubmit(e)}>Log in</button>

            <p className='text-sm  absolute -bottom-10 '>Don't have an account? <Link to="/auth/signin">
                 <span  className='text-dk-blue cursor-pointer'>Sign up</span>
                </Link> </p>
                 </div>

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
export default LogIn