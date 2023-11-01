"use client"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { CreateUser } from '@/fetchMethods'
import { useRouter } from 'next/navigation'
import UserContext from '@/contextApi/UserContext'

const page = () => {


    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [msg, setMsg] = useState('')
    const router = useRouter()
    let {setUser} = useContext(UserContext)


    const handleSigIn = async ()=>{

        
      const data =  await CreateUser(name,email,password)

      if(data.success){
      localStorage.setItem("moonbeam-user",JSON.stringify(data.data))
      setUser(JSON.parse(localStorage.getItem('moonbeam-user')))
      setMsg('')
      router.push('/')
      }

      setMsg(data.msg)
      
      
    //   console.log(data);

    }

  return (
    <div className="min-h-screen  flex flex-col justify-center sm:py-12">
    <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      
      <h1 className="font-bold text-center text-2xl text-red-600 mb-5">Moonbeam Cinema</h1>  
      <div className="bg-[#111] shadow w-full rounded-lg ">
        <div className="px-5 py-7">
          <label className="font-semibold text-sm  text-gray-600 pb-1 block">Name</label>
          <input onChange={(e)=>{setname(e.target.value)}} value={name} type="text" className="border rounded-lg text-black px-3 py-2 mt-1 mb-5 text-sm w-full" />
          <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
          <input onChange={(e)=>{setemail(e.target.value)}} value={email} type="email" className="border rounded-lg px-3 text-black py-2 mt-1 mb-5 text-sm w-full" />
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
          <input onChange={(e)=>{setpassword(e.target.value)}} value={password} type="password" className="border rounded-lg text-black px-3 py-2 mt-1 mb-5 text-sm w-full" />
          <button  onClick={handleSigIn}   type="button" className="transition duration-200 bg-gradient-to-r  MY-3 from-red-500/40 to-red-800/75 hover:bg-red-600   text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span className="inline-block mr-2">Sign in</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
          </button>
        <p className='text-red-500'>{msg}</p>

        </div>

      </div>
    
    </div>
  </div>
  )
}

export default page