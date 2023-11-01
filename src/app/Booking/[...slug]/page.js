import React from 'react'
// import {Seats} from '../../../data/Seats'
import { getMovie,getCinema,createSeats } from "../../../fetchMethods";
import Seats from '@/component/Seats';


const page = async ({params}) => {
  
  const movieId= decodeURIComponent(params.slug[1].split('-')[0])
  const time= decodeURIComponent(params.slug[1].split('-')[1])
  // console.log(time);
  const movie = await getMovie(movieId)
  const cinemaDetails = await getCinema(params.slug[0])
  // console.log(cinemaDetails);


 
  //In cinema database all the info regarding cinema's number of seat, screen size, speaker and seats detail 
  //in booking all the detail abt seats id, customer id, is the seat vip, is seat booked or not, cinema id,movie id,date and time,
  //Customer will have detail of customer such as email, phone number, ticket, customer name, is the customer booked from guest acc

  
  const data =  JSON.stringify(await createSeats(cinemaDetails,movie.id,time))




  return (
    <section className='flex  justify-center items-center '>
      

      <div className=' w-[55rem]  mt-20 '>
          <h2 className='text-2xl text-center '>{movie.title}</h2>
            
            {/* seats */}

            {data && <Seats cinemaId={cinemaDetails.id} data = {data} cinema={params.slug[0]} time ={time} movie={movie}/>}

      </div>

      




    </section>
  )
}

export default page