import React from 'react'

const Footer = () => {
  return (
    <div className=' bg-[#232629]  h-80 justify-around w-full text-gray-400 hidden'> 
    <div className='flex-1  text-sm flex p-2 gap-4 justify-center mt-6'>
        <div>
            <img src="/assets/navlogo.png" alt="" className='w-16 h-16'/>
        </div>
        <div className='flex flex-col gap-1'>
            <p className='my-2 uppercase font-bold text-white/60'> Stack Overflow</p>
            <span>Question</span>
            <span>Help</span>
        </div>
    </div>
    <div className='w-1/6 flex flex-col gap-1 p-2 mt-6 text-sm'>
    <p className='my-2 uppercase font-bold text-white/60'> Products</p>
            <span>Teams</span>
            <span>Advertising</span>
            <span>Collectives</span>
            <span>Talent</span>
    </div>
    <div className='w-1/6 flex flex-col gap-1 p-2 mt-6 text-sm'>
    <p className='my-2 uppercase font-bold text-white/60'> Company</p>
            <span>About</span>
            <span>Press</span>
            <span>Work Here</span>
            <span>Legal</span>
            <span>Privacy Policy</span>
            <span>Term of Service</span>
            <span>Contact Us</span>
            <span>Cookie Policy</span>
    </div> <div className='w-1/5 flex flex-col gap-1 p-2 mt-6 text-sm'>
    <p className='my-2 uppercase font-bold text-white/60'> Stack Exchange Network</p>
            <span>Technology</span>
            <span>Culture and recreation</span>
            <span>Life & art</span>
            <span>Science</span>
            <span>Professional</span>
            <span>Buisness</span>
    </div>

    <div className='flex-1 flex flex-col justify-between mt-2 py-8 text-xs'>
        <div className='flex gap-2'>
            <span>Blog</span>
            <span>LinkedIn</span>
            <span>Twitter</span>
            <span>Instagram</span>
            <span>Facebook</span>
        </div>
        <div>
            <span>Site design / logo © 2022 Stack Exchange Inc; user contributions licensed under CC BY-SA. rev 2022.10.28.42999</span>

        </div>
    </div>
    </div>
  )
}

export default Footer