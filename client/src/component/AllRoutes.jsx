import React,{useState,createContext } from 'react'
import { Routes ,Route  } from 'react-router-dom'
import Home from './Home'
import SideNav from './SideNav'
import SignIn from './User/SignIn'
import LogIn from './User/LogIn'
import AskQuestion from './MainPage/AskQuestion'
import Question from './MainPage/Question'
import Footer from './Footer'
import Profile from './Profile'
  export const UserContext=createContext()
const AllRoutes = () => {
  const [screen,setActiveScreen]=useState("Home");
  return (

  <Routes >
        <Route exact   path='/' element={
            <div>
             <div className="flex  mt-14  bg-white/60">
                    <SideNav setScreen={setActiveScreen} />
                    <Home screen={screen}/>
                </div> 
                  <Footer/>
          </div>
        }/>
        <Route exact path="/v1/question/:id" element={
        <div>
            <div className="flex  mt-14  bg-white/60">
                  <SideNav  setScreen={setActiveScreen}/>

                <Question />
                 
            </div> 
                  <Footer/>
</div>
        }
        />

        <Route exact path="/v1/profile" element={
            <div>
             <div className="flex  mt-14  bg-white/60">
                    <SideNav setScreen={setActiveScreen} />
                    <Profile/>
                </div> 
                  <Footer/>
          </div>}
        />
        <Route exact path='/auth/signin' element={<SignIn/>}/>

        <Route  path='/auth/login' element={<LogIn/>}/>
        <Route exact path='/v1/ask' element={<AskQuestion/>}/>

  </Routes>
  )
}

export default AllRoutes