import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllQuestion } from '../../actions/questionAction';
import Loading from '../Loading';

const AllQuestions = ({type}) => {
    const dispatch=useDispatch();
    const {questions,isLoading,error}=useSelector((state)=>state.question)

    useEffect(()=>{
        dispatch(getAllQuestion())
    },[dispatch])

        if(isLoading){
            return <Loading />
        }
        if(error){
            alert("Error Occured")
        }
        if(!questions){
            return <div className='mt-10 text-4xl font-semibold font-sans'>
                    <h1>NO QUESTION ADD SOME ....</h1>
            </div>
        }
  return (

     <div className='flex-1 '>
        <div>

    <div className=' mt-4 border-b px-4 pt-4'>
    <div className='flex justify-between items-center '>

        <span className='md:text-3xl text-2xl font-medium'>
            {type==="home" ?"Top Questions":" All Questions"}
            
            </span>
        <Link to="/v1/ask">
            <button className='bg-lt-blue px-3 rounded-md p-2 text-white hover:bg-sky-600 text-sm font-semibold'>Ask Questions</button>
        </Link>
    </div>
    <p className='md:pt-4 pt-2 pb-2 md:text-base text-sm text-gray-500'>
       {questions?.length} questions
    </p>
    </div>

    <div className=' overflow-scroll  '>
        {
            questions && questions.map((quest,key)=>{
                return (
            <div className='flex border-b md:gap-4 gap-6 py-5 pr-4 md:pl-10' key={key}>
            <div className='flex  md:w-1/5 w-1/4 items-center md:justify-center text-center md:gap-4 gap-2 text-sm md:flex-row flex-col justify-start ' >
                <span className='flex md:flex-col flex-row gap-2 items-center w-10'>
                   <span className='text-xl font-semibold'>  {quest.votes}</span> <span className='text-sm '>votes</span>
                </span>
                <span className='flex md:flex-col flex-row gap-2 items-center w-10'>
                   <span className='text-xl font-semibold'>  {quest.answers?.length}</span> <span className='text-sm '>answers</span>
                </span>
                {/* <span>
                    {quest.views} views
                </span> */}
            </div>
            <div className='flex flex-col gap-1 relative flex-1'>
                <Link to={`/v1/question/${quest._id}`}>
                <span className='text-dk-blue text-lg font-medium cursor-pointer'>
                    {quest.heading}
                </span>
                </Link>
                <div className='flex gap-2'>
                    {
                        quest.tags.map((tag,key)=>{
                return(

                <span key={key} className='text-sky-800  lowercase px-2 py-1  rounded-sm text-xs ring-dk-blue bg-lt-blue/20 '>
                {tag}
                </span>
                    );
                        })
                    }
                </div>
                <div className=''>
                    <span className="text-dk-blue text-xs absolute right-3">
                      By  {quest.askedBy?.name}
                    </span>
                </div>
            </div>
        </div>
                );
            })
        }
       
    </div>
    </div>
    
  </div>
  )
}

export default AllQuestions