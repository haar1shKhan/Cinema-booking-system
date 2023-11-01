'use client'
import React, { useState ,useContext} from 'react'
import Link from 'next/link'
import ProfileAbout from './ProfileAbout'
import Tickets from './Tickets'
import UserContext from '@/contextApi/UserContext'
import { useRouter } from 'next/navigation'


const ProfileComponent = () => {
  const router = useRouter()
  const {user,setUser} = useContext(UserContext)
  const [nav, setnav] = useState('about')
   const handleLogout=()=>{
        localStorage.removeItem('moonbeam-user')
        setUser(null)
        router.push('/')

    }

  return (
    <div className='h-screen w-screen flex'>
    <div className='bg-gradient-to-b from-[#111] to-[#1212] w-fit h-full flex flex-col '>
      
        <Link href={'/'} className={`text-2xl text-red-600   font-extrabold font-sans m-2`}>Moonbeam Cinema</Link>
      
        <button onClick={()=>{setnav('about')}} className='font-extrabold text-left pl-4 py-3 hover:bg-[#242323] ' href={'profile/'}>Profile</button>
        <button onClick={()=>{setnav('tickets')}} className='font-extrabold text-left pl-4 py-3 hover:bg-[#242323] ' href={'profile/purchasedTickets'}>tickets</button>
        <button onClick={handleLogout} className='font-extrabold text-left pl-4 py-3 hover:bg-[#242323] ' href={'profile/purchasedTickets'}>Logout</button>

    </div>
    {nav==='about'&&<ProfileAbout user={user}/>}
    {nav==='tickets'&&<Tickets user={user}/>}
</div>
  )
}

export default ProfileComponent