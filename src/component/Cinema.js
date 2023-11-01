import React from 'react'
import Link from "next/link";

const Cinema = ({name,id}) => {
  return (
    <div className="space-y-7" >

    <h4 className="text-2xl"> {name} </h4>
    <div className="ml-5 flex space-x-9">
      
      <div className='relative'>
        <div className='absolute rounded-2xl h-5 w-5 top-0.5 -left-1.5 bg-black'></div>
        <Link className='my-2 bg-gradient-to-l w-fit from-red-500/40 to-red-800/75 py-2 px-5 rounded-md hover:bg-gradient-to-l   transform transition duration-1000' href={`/Booking/${name}/${id}-1:00`}>1:00</Link>
      </div>

      <div className='relative'>
      <div className='absolute rounded-2xl h-5 w-5 top-0.5 -left-1.5 bg-black'></div>
      <Link className='my-2 bg-gradient-to-l w-fit from-red-500/40 to-red-800/75 py-2 px-5 rounded-md hover:bg-gradient-to-l   transform transition duration-1000' href={`/Booking/${name}/${id}-3:00`}>3:30</Link>
      </div>

      <div className='relative'>
      <div className='absolute rounded-2xl h-5 w-5 top-0.5 -left-1.5 bg-black'></div>
      <Link className='my-2 bg-gradient-to-l w-fit from-red-500/40 to-red-800/75 py-2 px-5 rounded-md hover:bg-gradient-to-l   transform transition duration-1000' href={`/Booking/${name}/${id}-4:45`}>4:45</Link>
      </div>

      <div className='relative'>
      <div className='absolute rounded-2xl h-5 w-5 top-0.5 -left-1.5 bg-black'></div>
      <Link className='my-2 bg-gradient-to-l w-fit from-red-500/40 to-red-800/75 py-2 px-5 rounded-md hover:bg-gradient-to-l   transform transition duration-1000' href={`/Booking/${name}/${id}-5:00`}>5:00</Link>
      </div>

      <div className='relative'>
      <div className='absolute rounded-2xl h-5 w-5 top-0.5 -left-1.5 bg-black'></div>
      <Link className='my-2 bg-gradient-to-l w-fit from-red-500/40 to-red-800/75 py-2 px-5 rounded-md hover:bg-gradient-to-l   transform transition duration-1000' href={`/Booking/${name}/${id}-7:30`}>7:30</Link>
      </div>

      <div className='relative'>
      <div className='absolute rounded-2xl h-5 w-5 top-0.5 -left-1.5 bg-black'></div>
      <Link className='my-2 bg-gradient-to-l w-fit from-red-500/40 to-red-800/75 py-2 px-5 rounded-md hover:bg-gradient-to-l   transform transition duration-1000' href={`/Booking/${name}/${id}-10:00`}>10:00</Link>
      </div>
      
    </div>
    
  </div>
  )
}

export default Cinema