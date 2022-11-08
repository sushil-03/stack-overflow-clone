import React from 'react'

const Input = (props) => {
  
  return (
    <input 
      className={`w-full  text-sm ${props.error ?"ring-red-500":"ring-lt-blue"} outline-none px-2 py-2 rounded-sm focus:ring-[1px] relative  ring-offset-1 focus:shadow-3xl ${props.classes}`}   
      {...props}  
      />

  )
}

export default Input