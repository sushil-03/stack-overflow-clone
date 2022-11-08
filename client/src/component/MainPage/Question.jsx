import React,{useEffect, useState} from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { TiArrowSortedUp,TiArrowSortedDown } from 'react-icons/ti';
import { BsClockHistory} from 'react-icons/bs';
import {FiBookmark} from 'react-icons/fi';



import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import { addAnswer, voteQuestion } from '../../actions/questionAction';
import { clearError } from '../../actions/questionAction';
import { getAllQuestion } from '../../actions/questionAction';
const Question = () => {
    const [answer,setAnswer]=useState("")
    const [status,setStatus]=useState("No Response");
    const dispatch=useDispatch();
    const {id}=useParams();
    const navigate=useNavigate();

    const {user}=useSelector((state)=>state.user);
    const {questions,isLoading,error}=useSelector((state)=>state.question)
    // useEffect(()=>{
    //     dispatch(voteQuestion(id,"No Response"))
    // },[dispatch, id])
    useEffect(()=>{
        if(error){
            alert(error);
            dispatch(clearError())
        }
        if(user && user.activity.length>0){
            const quest=user.activity.filter((activity)=>activity.question_id===id)
            if(quest.length !==0){
               setStatus(quest[0].status)
            }
       } 
    },[dispatch, error, id, status, user])

    const myQues=questions?.filter((ques)=>{
            return   ques._id===id
        })[0];

    if(isLoading ){
        return <>
            <Loading/>
        </>
    }

    
    const submitHandler=()=>{
        if(answer===""){
            alert("Answer can't be empty");
            return ;
        }
        if(!user){
            navigate("/auth/login")
        }
        dispatch(addAnswer(id,answer))
        setAnswer("")
    }
    const voteHandler=(message)=>{
        if(!user){
            navigate("/auth/login")
            return;
        }
        if(message!==status){
            dispatch(voteQuestion(id,message));
            dispatch(getAllQuestion())

            if(status==="No Response"){
                setStatus(message)
            }else {
                setStatus("No Respone")
            }
            setInterval(()=>{

            window.location.reload(false)
            },1000)
        }
    }
    if(!myQues){
        return <Loading/>
    }
  return ( 
    <div className='mt-14 ml-4  md:w-4/5 lg:mr-24 flex-1 mx-4'>
        <div className='flex'>
        <div className='md:w-4/5 w-full'>
        <div className='flex justify-between w-full  flex-wrap gap-2'>
            <p className='md:text-3xl text-xl font-medium text-black flex-1 min-w-fit' >
                {myQues.heading}
            </p>
            <Link to="/v1/ask">
            <button className='bg-lt-blue px-3 rounded-md py-2 text-white hover:bg-sky-600 text-sm font-semibold'>Ask Questions</button>
        </Link>
        </div>
        <div className='border-b'>
            <p className='text-gray-500 text-sm my-2'>
                Asked by  <span className='text-black'> {myQues.askedBy.name}</span>
            </p>
        </div>
        <div className='flex relative mt-5' >
            <div className='flex flex-col items-center w-[10%]  '>
                <TiArrowSortedUp  className={`${status==="UpVote"?'text-orange-600':'text-gray-400'} cursor-pointer text-4xl `}  onClick={()=>voteHandler("UpVote")}/>
                <span className='text-2xl'>{myQues.votes}</span>
                <TiArrowSortedDown className={`${status==="DownVote"?'text-red-600':'text-gray-400'} cursor-pointer text-4xl`}   onClick={()=>voteHandler("DownVote")}/>
                <FiBookmark className='text-gray-500  'size={"1.4rem"} />
                <BsClockHistory className='text-gray-500 mt-4'size={"1.4rem"} />
            </div>
            <div className='flex-1 mt-8  relative'>
                <div>
                {
                    myQues.detail

                }
                </div>
                <div className='flex flex-row mt-5 flex-wrap gap-4'>
                {
                myQues?.tags.map((myTag,key)=>{
                  return (
                    <span className='text-sm px-3 py-1 rounded-sm bg-sky-100 cursor-pointer'key={key}>{myTag}</span>
                  );
                })
              }
                </div>
                <div className='w-full absolute right-10 bottom-2'>
                    <p className='text-sky-800 text-sm text-right w-full font-medium'>
                      <span className='px-3 py-2 bg-orange-600 text-white  rounded-md mx-1'>
                        {myQues.askedBy.name[0]}
                        </span>  {myQues.askedBy.name}
                    </p>
                </div>
            </div>
        </div>
        <div className='mt-6 mb-2'>
            {myQues.answers.length >0 &&
        <span className='font-medium text-xl'>  {myQues.answers.length} Answer  </span>
            }
        </div>
        <div className='mb-6'>

        {
            myQues.answers.map((answers,key)=>{
                    return (

        <div className='flex  my-2 border-t gap-2' key={key} >
            <div className='flex flex-col items-center w-[10%]  my-2'>
                <TiArrowSortedUp  className='text-gray-300 text-3xl'  />
                <span className='text-2xl'>0</span>
                <TiArrowSortedDown className='text-gray-300 text-3xl'  />
                <FiBookmark className='text-gray-500  'size={"1.1rem"} />
                <BsClockHistory className='text-gray-500 mt-4 text-3xl'/>
            </div>
            <div className='flex-1 mt-8 my-2 flex flex-col gap-4'>
                <div>
                {
                answers.answer
                }
                </div>
                <div className='text-sm text-gray-600 gap-2 flex'>
                    <p>Share</p>
                    <p>Edit </p>
                    <p>Follow</p>
                </div> 

            </div>
              
        </div>


                    );
            })
        }
        </div>
        <div className='flex  flex-col py-3 border-t sm:mx-6 gap-2'>

        <span className='font-medium text-xl'>Your Answers </span>
        <textarea
                        placeholder=""
                        className="border-2 sm:w-4/5 w-full rounded-md text-sm p-3 font-mono"
                        name="body"
                        id="body"
                        cols="40"
                        rows="10"
                        value={answer}
                        onChange={(e)=>setAnswer(e.target.value)}
                    ></textarea>        </div>
        
        <div className='mx-6 my-4'>
                <button className="bg-sky-600 px-5 rounded-md py-2 text-white hover:bg-sky-800 font-semibold" onClick={()=>submitHandler()}>
                    Post your Answer
                </button>
            </div>
</div>
            
        </div>
    </div>
  )
}

export default Question