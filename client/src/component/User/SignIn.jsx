import React,{useState,useEffect} from 'react'
import Input from '../Input'
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify";
import {  signin } from '../../actions/userAction';
import Loading from '../Loading';
const SignIn = () => {
    const navigate=useNavigate();
    const {error,isLoading,isAuthenticated}=useSelector((state)=>state.user)
    const [pass,showPass]=useState(false);
    const dispatch=useDispatch();
    const initialValues={
            name:'',
            email:'',
            phone:'',
            password:'',
    }
    useEffect(()=>{
        if(isAuthenticated){
            toast.success("Sign in successfully")
            navigate("/");
        }
        if(error){
            toast.error(error);
        }
    },[error, isAuthenticated, navigate])
        const validationSchema =Yup.object({
        name:Yup.string().required("Required "),
        email:Yup.string().email("Invalid Email Format").required("Required"),
        phone:Yup.number()
        .positive("Can't start with a minus")
        .integer("Can't include a decimal point")
        .min(8)
        .required('Required'),
        password :Yup.string().required("Required "),
    })
    const formik=useFormik({
        initialValues ,
        onSubmit:values=>{
            dispatch(signin(values));
        },
        validationSchema,
    })

    if(isLoading){
        return <Loading/>
    }
  return (
    <div className='mt-14 bg-gray-200/40 h-screen  grid place-items-center font-sans overflow-hidden relative'>
            <div className='xl:w-1/4 lg:w-1/3 md:w-1/3  mx-auto border-2 overflow-hidden rounded-md shadow-xl t-14 bg-white text '>
                    <form action="" onSubmit={formik.handleSubmit}>
                    <div className=' py-3 px-6 relative'>
                        <label htmlFor="name" className='font-bold'>Display name</label>
                        
                        <div className={`border-2 ${formik.touched.name && formik.errors.name ?"border-red-400":"border-gray-300"}  rounded-md mt-1 `}>
                            <Input type="text" id="name" name="name" error={formik.errors.name || undefined}
                                {...formik.getFieldProps('name')}
                              placeholder="name"/>
                        </div>
                        <span className='text-xs text-red-600 absolute'>{formik.touched.name&&formik.errors.name }</span>
                    </div>


                   
                    <div className=' py-3 px-6 relative'>
                        <label htmlFor="email" className='font-bold'>Email </label>
                        <div className={`border-2 ${formik.touched.email && formik.errors.email ?"border-red-400":"border-gray-300"}  rounded-md mt-1`}>
                            <Input type="email" id="email" name="email"      {...formik.getFieldProps('email')} placeholder="email"/>
                        </div>
                        <span className='text-xs text-red-600 absolute'>{formik.touched.email&&formik.errors.email }</span>
                    </div>
                    <div className=' py-3 px-6 relative'>
                        <label htmlFor="phone" className='font-bold'>Mobile Number </label>
                        <div className={`border-2 ${formik.touched.phone && formik.errors.phone ?"border-red-400":"border-gray-300"}  rounded-md mt-1`}>
                            <Input  type="number"  id="numebr" name="phone"      {...formik.getFieldProps('phone')} placeholder="phone number" />
                        </div>

                        <span className='text-xs text-red-600 absolute'>{formik.touched.phone&&formik.errors.phone }</span>
                    </div>
                    <div className=' py-2 px-6 relative'>
                        <label htmlFor="password" className='font-bold '>Password </label>
                        <span className='text-xs text-red-600 absolute -bottom-2  left-6'>{formik.touched.password&&formik.errors.password }</span>
                        <div className={`border-2 ${formik.touched.password && formik.errors.password ?"border-red-400":"border-gray-300"}  rounded-md mt-2 relative`}>
                            <Input type={`${pass===false ?"password":"text"}`} id="password" classes="pr-10" name="password"    {...formik.getFieldProps('password')} placeholder="password"/>
                            <div className='absolute right-2 text-xl mt-2 bottom-2' onClick={()=>showPass(!pass)}>

                            {
                                pass ?  < AiOutlineEye/>:<  AiOutlineEyeInvisible/>
                            }

                            </div>

                        
                    </div>
                    </div>
                    <p  className='mt-4 px-6 text-gray-600 text-xs leading-tight'>Passwords must contain at least eight characters, including at least 1 letter and 1 number.</p>
                    <button type="submit" className='bg-lt-blue  rounded-sm p-2 text-white hover:bg-sky-600 w-5/6 block mx-auto my-4 font-semibold'>Sign up</button>
                    </form>
                    <p className='text-xs w-4/5 mx-auto my-4'>By clicking “Sign up”, you agree to our <span  className='text-dk-blue'> terms of service</span> , <span className='text-dk-blue'> privacy policy </span>and <span className='text-dk-blue'> cookie policy</span></p>

            <p className='text-sm  absolute bottom-24 '>Already have an account? 
            <Link to="/auth/login">
            <span  className='text-dk-blue cursor-pointer'>Log in</span> 
            
            </Link>
            </p>
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

export default SignIn