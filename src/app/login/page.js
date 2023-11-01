'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { LoginUser } from '@/fetchMethods'
import { useRouter } from 'next/navigation'
import UserContext from '@/contextApi/UserContext'

const page = () => {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState('')
  const [msg, setMsg] = useState('')
  const router = useRouter()
  let {setUser} = useContext(UserContext)

  const handleLogin = async ()=>{

    const data = await LoginUser(email,password) 
    if(data.success){

      localStorage.setItem("moonbeam-user",JSON.stringify(data.data))
      setUser(JSON.parse(localStorage.getItem('moonbeam-user')))
      setMsg('')
      router.push('/')

    }

    setMsg(data.mgs)


  }

  return (
<div className="min-h-screen  flex flex-col justify-center sm:py-12">
  <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
    
    <h1 className="font-bold text-center text-2xl text-red-600 mb-5">Moonbeam Cinema</h1>  
    <div className="bg-[#111] shadow w-full rounded-lg ">
      <div className="px-5 py-7">
        <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
        <input onChange={(e)=>{setemail(e.target.value)}} value={email}  type="text" className="border text-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
        <input onChange={(e)=>{setpassword(e.target.value)}} value={password}  type="password" className="border text-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
        <button onClick={handleLogin} type="button" className="transition duration-200 bg-gradient-to-r  from-red-500/40 to-red-800/75 hover:bg-red-600   text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span className="inline-block mr-2">Login</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                <path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </button>
        <p className='text-red-500'>{msg}</p>
      </div>
     
        <div className="py-5">
        <div className="grid grid-cols-2 gap-1">
          <div className="text-center mb-4 sm:text-left whitespace-nowrap">
            <Link href={'/'} className="transition duration-200 mx-5  px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                    <path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span className="inline-block ml-1">Forgot Password</span>
            </Link>
          </div>
          <div className="text-center  mb-4 sm:text-right whitespace-nowrap">
            <Link href={'/signIn'} className="transition duration-200 mx-5  px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                    <path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="inline-block ml-1">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</div>
  )
}

export default page