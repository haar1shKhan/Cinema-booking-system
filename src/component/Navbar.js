"use client"
import { UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React, { useContext, useEffect, useState } from 'react'
import userContext from '@/contextApi/UserContext'


const Navbar = () => {

    const pathname = usePathname()

    const [colorChange, setColorchange] = useState(false);
    const {user,setUser} = useContext(userContext)
    

    
    useEffect(() => {

        const changeNavbarColor = () => {
            if (window.scrollY >= 80 ) {
                setColorchange(true);
            }
            else if (pathname === '/' || pathname.includes('/movie')){
                setColorchange(false);
            }
        };
      
        window.addEventListener("scroll",changeNavbarColor)
        setUser(JSON.parse(localStorage.getItem("moonbeam-user")))

        
        return () => {
              window.removeEventListener('scroll', changeNavbarColor);
         };

    
    }, [pathname,user?.email])
    
    if (pathname.includes('/profile')) {
        return null; // Hide the navbar on the /profile page
      }
    // console.log('lof',user);
    // console.log(context);
    // console.log(user);
    // const [user, setUser] = useState(false);
  



   

    
  return (
    <div className={`flex  justify-between items-center ${colorChange || (pathname !== '/'  && !pathname.includes('/movie') && !colorChange) ?"bg-gradient-to-br from-[#6e1616] to-[#240909]  ":"bg-gradient-to-b  from-black/50 to-transparent  "} transition  duration-500 ease-in-out py-4 text-lg  mx-auto fixed w-full top-0 left-0 z-50`}>
        <div className='flex items-center'>
            <Link href={'/'} className={`text-3xl ${colorChange?"text-white":"text-red-600"}  transform transition duration-500 ease-in-out font-extrabold font-sans ml-5`}>Moonbeam Cinema</Link>
        </div>
        <div className='flex items-center space-x-4  mr-5'>
            <Link className='hover:text-red-500 font-medium' href={'/'}>Home</Link>
            <Link className='hover:text-red-500 font-medium' href={'/'}>About us</Link>
            <Link className='hover:text-red-500 font-medium' href={'/'}>Upcoming Movies</Link>
            <Link className='hover:text-red-500 font-medium' href={'/'}>Now Showing</Link>
            {/* {user?<div title='logout' className='flex items-center cursor-pointer hover:text-red-500 font-medium'><h1 className=' '>{user.name}</h1> <span><UserIcon className='h-7 w-7 ml-2'/></span></div>:<Link className='hover:text-red-500 font-medium' href={'/login'}>Login</Link>} */}
            {user?<div title='logout' className='flex items-center cursor-pointer text-red-600 font-medium'><Link href={'/profile'} className='flex bg-black border border-red border-red-900 rounded-xl px-3 py-1'>{user.name}<UserIcon className='h-7 w-7 ml-2'/></Link></div>:<Link className='hover:text-red-500 font-medium' href={'/login'}>Login</Link>}
        </div>
    </div>
  )
}

export default Navbar