import React, { useContext } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'


const ProfileAbout = ({user}) => {
  return (
    <div className='w-screen h-[550px] bg-[#111] rounded-lg m-5 my-auto '>

        <div className='flex flex-col mx-10'>
            <UserCircleIcon className='h-[180px]'/>
            <div className='space-y-2'>
              <h1 className=' text-xl'>Name:{user?.name}</h1>
              <h1 className=' text-xl'>Email:{user?.email}</h1>
            </div>
        </div>



    </div>
  )
}

export default ProfileAbout