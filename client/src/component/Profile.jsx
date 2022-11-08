import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Loading from './Loading'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './Map';



const Profile = () => {
  const [show,setShow]=useState(false);
  const {user}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!user){
      navigate("/auth/login")
    }
  },[navigate, user])
  if(!user){
    return <Loading />
  }
  const showMap=()=>{
    setShow(!show);
  }
  return (
    <div className='mt-8 ml-8 h-screen w-screen' >
        <div className='flex items-center gap-5'>

        <div className='w-28 h-28 bg-green-400 rounded-md relative'>
          <p className='absolute  left-1/2 top-1/2 -translate-y-1/2	 -translate-x-1/2	 text-4xl font-bold text-white'>
            {user.name[0]}
          </p>
        </div>
        <div className='flex flex-col justify-end'>
            <span className='text-3xl'>{user.name}</span>
            <span className='text-gray-600 text-sm'>Joined on {new Date(user.joinedOn).toDateString()}</span>
            <span className='text-gray-600 text-sm'>Total question : {user.question}</span>
        </div>
        </div>
        <div className='mt-6'>
     < button className='text-dk-blue px-3 py-2  rounded-sm ring-[1px] ring-dk-blue bg-lt-blue/20 hover:bg-lt-blue/40 uppercase font-bold shadow-mdx' onClick={()=>showMap()}>
      {show ? "Hide your location":" Get your current Location here" }
     
      </button>
        </div>
        {
          show && <Map/>
        }
     
        {/* {
          show && <div className='w-4/5 h-4/5'>

              <MapContainer center={ [78.032188, 30.316496]} zoom={3} scrollWheelZoom={false} style={{width:'100vw',height:'100vh'}}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>


          </div>
        } */}
     
    </div>
  )
}


export default Profile