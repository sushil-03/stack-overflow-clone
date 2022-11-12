import React,{useState,useEffect} from 'react'
import Input from '../Input'
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify";
import {  signin } from '../../actions/userAction';
import codes from 'country-calling-code';
import Loading from '../Loading';
const SignIn = () => {
    const navigate=useNavigate();
    const {error,isLoading,isAuthenticated}=useSelector((state)=>state.user)
    const [pass,showPass]=useState(false);
    const dispatch=useDispatch();
    const [allCodes,setCodes]=useState(codes)
    const [code,showCode]=useState(false);
    const [myCode,setMyCode]=useState("91")
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
            values.phone = '+'+myCode+values.phone
            console.log(values);
            dispatch(signin(values));
        },
        validationSchema,
    })

    if(isLoading){
        return <Loading/>
    }
    function handleCountry(str){
        console.log(str);
        if(str===""){
            setCodes(codes)
        }else{
        const newCodes= codes.filter((code)=>code.country.toUpperCase().match(str.toUpperCase()));
        setCodes(newCodes)
        }
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
                    {/* <div className=' py-3 px-6 relative'>
                        <label htmlFor="phone" className='font-bold'>Mobile Number </label>
                        <div className={`border-2 ${formik.touched.phone && formik.errors.phone ?"border-red-400":"border-gray-300"}  rounded-md mt-1`}>
                         
                            <div className={` absolute z-40 top-0  left-0 flex w-full flex-col min-w-fit ${code &&"h-44"} overflow-scroll`}>
                            {
                                
                                code ===false ?
                                <p onClick={()=>{
                                    showCode(!code)
                                
                                }} className="px-2 w-min z-10 border-r-2  border-gray-200 cursor-pointer text-sky-600 font-semibold py-2  gap-2">{myCode}</p>    :
                                <div className='w-full'>
                                    <Input placeholder='search by country' classes="z-20 border-b border-2"  onChange={(e)=>handleCountry(e.target.value)}/>
                                    {allCodes.sort().map((code,key)=>{
                                        return <span key={key} className='px-2  cursor-pointer bg-gray-200 flex justify-between items-center  border-b border-gray-300 py-1' onClick={()=>{
                                            setMyCode(code.countryCodes[0])
                                            showCode(!code);
                                        }}>
                                          <span>{code.isoCode2}  </span>
                                          <span className='text-sm'> {code.country} </span>
                                             
                                             </span> 
                                    })
                                }
                                </div>
                            }
                            </div>
                            <Input  type="number"  id="numebr" name="phone"      {...formik.getFieldProps('phone')} placeholder="phone number" />
                        </div>

                        <span className='text-xs text-red-600 absolute'>{formik.touched.phone&&formik.errors.phone }</span>
                    </div> */}
                     <div className='  pb-2 px-6 relative'>
                        <label htmlFor="phone" className='font-bold '>Phone </label>

                        
                        <div className={` border-gray-300  rounded-md  relative  flex`}>
                            <div className={` absolute z-40 top-0  left-0 flex w-full flex-col min-w-fit ${code &&"h-44"} overflow-scroll`}>
                            {
                                
                                code ===false ?
                                <p onClick={()=>{
                                    showCode(!code)
                                
                                }} className="px-2 w-min z-10 border-r-2  border-gray-200 cursor-pointer text-sky-600 font-semibold py-2  gap-2">{myCode}</p>    :
                                <div className='w-full'>
                                    <Input placeholder='search by country' classes="z-20 border-b border-2 "  onChange={(e)=>handleCountry(e.target.value)}/>
                                    {allCodes.sort().map((code,key)=>{
                                        return <span key={key} className='px-2  cursor-pointer bg-gray-200 flex justify-between items-center  border-b border-gray-300 py-1' onClick={()=>{
                                            setMyCode(code.countryCodes[0])
                                            showCode(!code);
                                        }}>
                                          <span>{code.isoCode2}  </span>
                                          <span className='text-sm'> {code.country} </span>
                                             
                                             </span> 
                                    })
                                }
                                </div>
                            }
                            </div>
                        {/* <div className={`border-2 border-gray-300  rounded-md  relative  flex ${code && "hidden"}`}> */}
                       
                            {/* <Input type="text" id="phone" classes="pr-24 z-40 ml-9" name="phone" placeholder="phone" value={phone}  onChange={(e)=>setPhone(e.target.value)}/> */}
                    {/* </div> */}
                    <div className={` border-gray-300  rounded-md  relative  flex`}>
                            <div className={` absolute z-40 top-0  left-0 flex w-full flex-col  ${code &&"h-44"} overflow-scroll`}>
                            {
                                
                                code ===false ?
                                <p onClick={()=>{
                                    showCode(!code)
                                
                                }} className="px-2  z-10 border-r-2  border-gray-200 cursor-pointer text-sky-600 font-semibold py-2  gap-2">{myCode}</p>    :
                                <div className='w-full'>
                                    <Input placeholder='search by country' classes="z-20 border-b border-2 w-full"  onChange={(e)=>handleCountry(e.target.value)}/>
                                    {allCodes.sort().map((code,key)=>{
                                        return <span key={key} className='px-2  cursor-pointer bg-gray-200 flex justify-between items-center  border-b border-gray-300 py-1' onClick={()=>{
                                            setMyCode(code.countryCodes[0])
                                            showCode(!code);
                                        }}>
                                          <span>{code.isoCode2}  </span>
                                          <span className='text-sm'> {code.country} </span>
                                             
                                             </span> 
                                    })
                                }
                                </div>
                            }
                            </div>
                        <div className={`border-2 border-gray-300  rounded-md  relative  flex ${code && "hidden"}`}>
                            <Input type="number" id="phone" classes="pr-24 z-40 ml-9 ml-4" name="phone" placeholder="phone" {...formik.getFieldProps('phone')} 
                            />

                    </div>

                        </div>
                        </div>
 {/* <Input  type="number"  id="numebr" name="phone" classes="z-20 border-b border-2"      {...formik.getFieldProps('phone')} placeholder="phone number" /> */}
                        
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