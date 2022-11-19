import React from 'react'
import { HiPencil } from 'react-icons/hi';
import { BsChatRight } from 'react-icons/bs';
import { BsStackOverflow } from 'react-icons/bs';

const News = () => {
    const tags=["react","css","html","c","c++","java","python","c#","javascript","jquery","machine learning","data science"]
    const newList=[{
        heading:"The Overflow Blog",
        subContent:[{
            icon:<HiPencil/>,
            content:"Introducing the Ask Wizard: Your guide to crafting high-quality questions"
        },{
            icon:<HiPencil/>,
            content:"How to get more engineers entangled with quantum computing (Ep. 501)"
        }]
      }
      ,{
        heading:"Featured on Meta",
        subContent:[
            {
            icon:<BsChatRight/>,
            content:"The 2022 Community-a-thon has begun!"
            }
            ,{
            icon:<BsChatRight/>,
            content:"Mobile app infrastructure being decommissioned"

            },{
                icon:<BsStackOverflow />,
                content:"Staging Ground Workflow: Canned Comments"
              }
              ,{
                    icon:<BsStackOverflow />,
                    content:"The Ask Wizard (2022) has graduated"
            }
        ]
      },{
        heading:"Hot Meta Post",
        subContent:[
            {
            icon:4,
            content:"How to view previous Stack Overflow initiatives"
            }
            ,{
            icon:8,
            content:"Any plans to burninate [project-planning]?"

            }
        ]
      }]
  return (
    <div className='w-1/4 mt-8 mr-8 ml-5  flex-col gap-2 md:flex hidden ' >

      <div className='border-[#f1e4bb]  rounded-md border-x-2 border-b-2'>
      {
        newList.map((news,key)=>{
          return (
          <div className=''key={key}>
            <div className='bg-[#fbf3d5] '> <p className='text-sm border-y-2 border-[#f1e4bb] font-semibold py-2 pl-4 text-black '>{news.heading}</p> </div>

            <div className='flex  flex-col bg-[#FDF7E2] pb-4'>
              {
                news.subContent.map((mycontent,key)=>{
                  return (
              <div className='flex px-6 mt-3 'key={key}>
              <span className='mr-3 mt-1 text-sm'> {mycontent.icon}</span>
              <span className='text-sm'>{mycontent.content}</span>
              </div> 
                  );
                })
              }
            </div>
        </div>
          );
        })
      }
        </div>
        <div className='bg-slate-50 '> <p className='text-sm border rounded-sm font-semibold py-2 pl-4 text-black '>Watched Tag</p> 

            <div className='flex  flex-row flex-wrap gap-3 pb-4 bg-white/40 m-4 '>
              {
                tags.map((myTag,key)=>{
                  return (
                <span className='text-sm px-3 py-1 rounded-sm bg-sky-100 cursor-pointer'key={key}>{myTag}</span>
                  );
                })
              }
              </div>
            </div>
    </div>
  )
}

export default News