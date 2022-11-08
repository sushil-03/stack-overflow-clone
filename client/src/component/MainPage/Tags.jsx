import React from 'react'

const Tags = () => {
  const tags=[{
    heading:"javascript",
    detail:" For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Keep in mind that JavaScript is NOT the same as Java! Include all labels that are relevant to your question; "
  },
{
  heading:"python",
  detail:"Python is a multi-paradigm, dynamically typed, multi-purpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax. Please note that Python 2 is officially out of support as of 2020-01-01. For version-specific Python questions tag."
},{
  heading:"java",
  detail:"Java is a high-level object-oriented programming language. Use this tag when you're having problems using or understanding the language itself. This tag is frequently used alongside other tags for libraries and/or frameworks used by Java developers."
},{
  heading:"c#",
  detail:"C#  is a high level, statically typed, multi-paradigm programming language developed by Microsoft. C# code usually targets Microsoft's .NET family of tools and run-times, which include .NET, .NET Framework, .NET MAUI, and Xamarin among others."

},{
  heading:"php",
  detail:" PHP is a widely used, open source, general-purpose, multi-paradigm, dynamically typed and interpreted scripting language designed initially for server-side web development. Use this tag for questions about programming in the PHP language."

},{
  heading:"android",
  detail:"Android is Google's mobile operating system, used for programming or developing digital devices (Smartphones, Tablets, Automobiles, TVs, Wear, Glass, IoT). For topics related to Android, use Android-specific tags such as android-intent, android-activity, android-adapter, etc. "

},{
  heading:"html",
  detail:"HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser. Questions regarding HTML should include a minimal reproducible example and some idea of what you're trying to achieve. "
},{

  heading:"c++",
  detail:"C++ is a general-purpose programming language. It was originally designed as an extension to C and has a similar syntax, but it is now a completely different language. Use this tag for questions about code (to be) compiled with a C++ compiler.  " }

]
  return (

    <div className='mt-6 mx-6'>
      <div>
        <span className='text-3xl font-semibold'>Tags</span>
        <p className=' mt-2 text-sm text-gray-700 w-2/3'>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
      </div>
      <div className="flex md:gap-6 gap-2 mt-8 flex-wrap my-10 pb-10 justify-around">
        {
          tags.map((tag,key)=>{
            return (

        <div key={key} className='lg:w-1/5 md:w-1/3 sm:w-1/2 border-2 py-6 px-3 rounded-md  flex items-start flex-col gap-2 h-80  overflow-hidden text-ellipsis'>
                <p className=' w-min text-sm px-3 py-1 rounded-sm bg-sky-200 cursor-pointer text-sky-800'>{tag.heading}</p>
          <span className="text-sm">
                {tag.detail}
          </span>
        </div>

            );
          })
        }
      </div>
    </div>
  )
}

export default Tags