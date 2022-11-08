import React, { useEffect }  from 'react'
import News from './News';
import Tags from './MainPage/Tags';
import User from './MainPage/User';
import AllQuestions from './MainPage/AllQuestions';
import LogIn from './User/LogIn';
import { useSelector,useDispatch } from 'react-redux';
import { loadUser } from '../actions/userAction';

const Home = ({screen }) => {
    const {user}=useSelector((state)=>state.user)
    const dispatch=useDispatch();
    useEffect(()=>{
        
        dispatch(loadUser());
    },[dispatch])
     if(screen==="tags"){
        return (

            <div className='flex-1 flex overflow-y-scroll h-screen'>
                <Tags />
            </div>
        )
    }else if(screen==="users"){
        return (

            <div className='flex-1 flex overflow-y-scroll h-screen'>
                {user===null ?
                    <LogIn/>:
                <User />
                }
            </div>
        )
    }
    
        return (

            <div className='flex-1 flex overflow-y-scroll h-screen'>
                <AllQuestions type={screen}/>
                <News/>
            
            </div>
        )
        
}

export default Home