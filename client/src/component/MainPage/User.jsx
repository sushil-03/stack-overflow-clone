import React, { useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { getAllUser } from '../../actions/userAction';
import Loading from '../Loading';
const User = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    
     dispatch(getAllUser())
  },[dispatch])
  const {users,isLoading}=useSelector((state)=>state.user)
  if(isLoading){
    return <Loading />
  }
  return (
    <div className='mx-4 text-white'>
      <div>
        <p className='text-xl font-semibold mt-5'>ALL USER</p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center ">
        {users && users.map((user,key)=>{
          return <div className="bg-sky-700 flex p-2 rounded-md cursor-pointer gap-2">
            <div className="m-1">
              <p className="bg-sky-500  rounded-full text-semibold w-10 h-10 text-center text-white capitalize text-xl pt-1">{user.name[0]}</p>
            </div>
            <div>
              <p>{user.name}</p>
              <p>Joined on { new Date(user.joinedOn).toDateString()}</p>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default User