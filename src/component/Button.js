'use client'
import React, { useContext, useState } from 'react'
import UserContext from '@/contextApi/UserContext'

const Button = ({isBooked,isVip,id,seat,setBookingSeats,price}) => {

    const [isPicked, setisPicked] = useState(false)
    let {user} = useContext(UserContext)


    const handleClick =()=>{

        setisPicked((isPicked)=>(!isPicked))
        // console.log(price);

        
        setBookingSeats((seatId) => {
            // Check if the ID is already in the array
            const index = seatId.findIndex((seat) => seat.id === id);
      
            if (index !== -1) {
              // If the ID is already in the array, remove it
              const updatedSeats = [...seatId];
              updatedSeats.splice(index, 1);
              return updatedSeats;
            } else {
              // If the ID is not in the array, add it
              return [...seatId, {id,price,seat,user:user?.id}];
            }})
    }
    
  return (
      // <button onClick={handleClick} disabled={isBooked} className={`w-[45px] text-center my-1.5 mx-1 rounded-b-full ${isPicked && !isBooked && "bg-pink-600"} ${isVip? "bg-yellow-600": "bg-white/60"} disabled:bg-green-800  px-1 py-3`}>{seat}</button>
      <button onClick={handleClick} disabled={isBooked} className={`w-[45px] text-center my-1.5 mx-1 rounded-b-full  ${!isPicked && isVip? "bg-yellow-600": isPicked && !isBooked? "bg-pink-600":"bg-white/60"} disabled:bg-green-800  px-1 py-3`}>{seat}</button>
  )
}
export default Button