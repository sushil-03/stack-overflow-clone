import React,{useState,useContext} from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsXLg } from 'react-icons/bs';

import { Link } from 'react-router-dom';
const SideNav = ({setScreen}) => {

  const [show,setShow]=useState(false);
  const [activeScreen,setActiveScreen]=useState("Home");
  const navlist=[{
    heading:"Home",
    link:"/question",
    subHeading:[]
  },{
    heading:"Public",
    link:"",
    specialClass:"pointer-events-none",
    subHeading:[
           "Questions", "Tags","Users","Companies",
    ]
  },{
    heading:"Collective",
    link:"",
    specialClass:" pointer-events-none	",
    subHeading:[
    "Explore Collectives"
    ]
  },{
    heading:"Teams",
    link:"",
    specialClass:"pointer-events-none	",
    subHeading:[
    "Create free Team"
    ]

  }]
  const handleClick=(mainPage)=>{
    const s=mainPage.toLowerCase().split(" ").join("-");
    setScreen (s);
    setActiveScreen(mainPage)
    setShow(false)
  }
  return (
    
    <div className='block  md:w-1/5 w-10 md:border-r  text-lt-gray pt-14 h-screen relative '>
            <ul className='md:flex flex-col   md:ml-16 ml-8 mt-8 gap-2 text-sm hidden '>
        {
            navlist.map((list,key)=>{
                    return (
                      <Link to="/" key={key}>
                        <li > 
                        
                       
                        <span className={`mr-4  w-full py-1 block  border-4 border-transparent cursor-pointer ${activeScreen===list.heading &&"border-r-orange-500 border-4 bg-gray-100 border-gray-100 sm:font-bold"} ${list.specialClass}`} 
                            onClick={()=>handleClick(list.heading)}
                        >{list.heading}</span>
                            <ul className=' flex flex-col gap-2 text-gray-700 text-sm font-medium '>
                                {
                                    list.subHeading.map((sub,i)=>{
                                        return (
                                            <li  className={`ml-5 cursor-pointer border-4 border-transparent ${activeScreen===sub &&"border-r-orange-500 border-4 bg-gray-100 border-gray-100 font-bold  text-sm"}`} key={i} 
                                            
                                            onClick={()=>handleClick(sub)}> {sub}</li>

                                        );
                                    })
                                }
                            </ul>
                        </li>
                        </Link>
                    );
            })
        }
            </ul> 
            <div className='md:hidden block'>
              <div className='absolute inset-0 pl-4 pt-4 text-white'>
                {
                 !show &&
                  <GiHamburgerMenu size={"1.5rem"} onClick={()=>setShow(!show)}  className='cursor-pointer text-orange-500 z-40'/>

                }
                {
                  show && <div className='w-screen h-screen bg-black text-white absolute inset-0 z-30'>
                      <div className='pl-4 pt-4'>

                    <BsXLg size={"1.5rem"} onClick={()=>setShow(!show)}  className='cursor-pointer text-orange-500 z-40 '/>
                      </div>
                      <div>
                      <ul className='flex-col  mx-16 mt-8 gap-5  '>
            {
              navlist.map((list,key)=>{
                    return (
                      <Link to="/" key={key}>
                        <li className=' items-center'> 
                        
                       
                        <p className={`mr-4  w-full py-1 block  border-4 border-transparent cursor-pointer ${activeScreen===list.heading &&" text-orange-700 font-bold text-xl"} ${list.specialClass}`} 
                            onClick={()=>handleClick(list.heading)}
                        >{list.heading}</p>

                            <ul className=' flex flex-col gap-2 text-gray-400  font-medium text-base'>
                                {
                                    list.subHeading.map((sub,i)=>{
                                        return (
                                            <li  className={`ml-5 cursor-pointer border-4 border-transparent ${activeScreen===sub &&" text-orange-500  font-bold  text-base rounded-sm"} `} key={i} 
                                            
                                            onClick={()=>handleClick(sub)}> {sub}</li>

                                        );
                                    })
                                }
                            </ul>
                        </li>
                        </Link>
                    );
            })
        }
            </ul> 
                      </div>

                  </div>
                }
              </div>
            </div>
 
    </div>
  )
}

export default SideNav