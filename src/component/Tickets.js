'use client'
import { getBooking, getMovie } from '@/fetchMethods'
import Image from 'next/image'
import React, { useEffect, useLayoutEffect, useState } from 'react'


const Tickets =  ({user}) => {
//   const tickets = await getBooking(user.email)
//   console.log(tickets);
const [tickets, setTickets] = useState([])

useEffect(() => {
      
    const  GetTickets = async ()=>{

        const ticketsDetails = await getBooking(user.id)
        setTickets(ticketsDetails)
     }

     GetTickets()
     

     
    }, [])
    
    console.log(tickets);

  return (
    <div className='flex w-screen p-5 flex-col overflow-y-auto'>

          {tickets?.map((ticket,index)=>{
          return <div key={index} className='bg-[#111]  flex items-center  mx-10 justify-between my-5 rounded-xl'>
                    
                    <div className='space-y-2 ml-8 font-bold'>
                       <h1 className='text-3xl '>Movie : {ticket.movieTitle}</h1>
                       <p className='text-xl font-light'>
                        Seats : {
                            ticket.seats.map((seat,index)=>{
                                return <span  key = {index}>{seat}{index!==ticket.seats.length-1?", ":""}</span>
                            })
                        }
                        </p>
                        <p className='text-lg font-medium'>Time : {ticket.time}</p>
                        <p className='text-lg font-medium'>Cinema : {ticket.cinema.split('-')[0]} {ticket.cinema.split('-')[1]}</p>
                        
                    </div>

                    <Image alt={"poster"} height={80} width={140} className="h-[300px] w-[240px] rounded-tr-xl rounded-br-xl   " src={`https://image.tmdb.org/t/p/original/${ticket.moviePoster}`} />


                 </div>
          })}
    
    </div>
  )
}

export default Tickets