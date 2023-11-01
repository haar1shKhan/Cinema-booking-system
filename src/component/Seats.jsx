"use client"
import React, { useEffect,useContext, useState } from 'react'
import Button from '@/component/Button';
import { LoginUser, stripePayment } from '@/fetchMethods';
import { useRouter } from 'next/navigation'



import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import userContext from '@/contextApi/UserContext';

const Seats = ({data,movie,cinema,time}) => {
    
    const router = useRouter();
    const seats = JSON.parse(data);
    const [bookingSeats, setBookingSeats] = useState([]);
    const [render, setRender] = useState(false);
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    let {user, setUser} = useContext(userContext)

    console.log(bookingSeats);

    const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });

    // const user = JSON.parse(localStorage.getItem("moonbeam-user"));

    useEffect(() => {
      setRender(false);
    }, [render]);

    let total = 0;
    bookingSeats.map((seats) => {
      total += seats.price;
      // console.log(total)
    });

    const handleClick = async () => {
      setRender(true);
      emblaApi.scrollNext();
    };

    const handleLogin = async () => {
      const data = await LoginUser(email, password);

      localStorage.setItem("moonbeam-user", JSON.stringify(data.data));
      setUser(JSON.parse(localStorage.getItem('moonbeam-user')))

      setRender(true);

      if (user) {
        emblaApi.scrollNext();
      }
    };

    const handleBuyNow = async () => {
      console.log(cinema);
      const movieDetail = {
        movieTitle: movie.title,
        movieImg: movie.poster_path,
      };


      const session = await stripePayment(movieDetail, bookingSeats, time,user.id);

      router.push(session);
    };



  return (
             <>
                     {/* screen */}
                     <div className='h-[4.5rem] w-full my-8   bg-[#111]'>
                         <div className='flex items-center justify-between h-full'>
                            <div className='space-y-2'>

                             <div className='flex space-x-4'>


                               <div className='flex items-center space-x-2'>
                                   <div className='bg-white/60 h-5 w-5  rounded-lg ml-3'></div> <p>Available seats</p>
                               </div>

                               <div className='flex items-center space-x-2'>
                                   <div className='bg-green-600 h-5 w-5  rounded-lg '></div> <p>Booked seats </p>
                               </div>

                               <div className='flex items-center space-x-2'>
                                   <div className='bg-yellow-600 h-5 w-5  rounded-lg '></div> <p>Vip seat</p>
                               </div>

                             </div>
                            

                            <p className='ml-3'>Total: {total}$</p>
                            </div>
                            <div className='flex items-center space-x-2 mr-3 '>
                               <button disabled={bookingSeats.length===0} onClick={handleClick} className='bg-gradient-to-r px-3 py-2 from-red-500/40 to-red-800/75 rounded-md' >Confirm seats</button>
                             </div>
                          </div>
                    </div>


                    <div className='embla' ref={emblaRef}> 
                          <div className='embla__container'>                 
                                <section className='embla__slide'> 
                                    <div className='h-20 rounded-tl-3xl text-center text-4xl text-black   rounded-tr-3xl w-3/4 bg-white/60  mx-auto  '>Screen</div>
                                    <div className={`grid grid-cols-8 my-[50px] w-3/4 mx-auto `}>
                                          {seats?.map((seat,index)=>
                                          {
                                            // if(seat.id==="B3"){
                                              //   seat.isBooked=true
                                              // }
                                              return <Button price ={seat.price} setBookingSeats ={setBookingSeats} key={seat.seatId} id={seat._id} seat ={seat.seatId} isBooked={seat.isBooked} isVip = {seat.isVip} />
                                          })}
                                    </div>
                              </section>
                              {!user && 
                               <section  className='embla__slide bg-[#111111]'>
                                        <button className='flex justify-center items-center m-3 w-fit' onClick={()=>{emblaApi.scrollPrev()}}><ArrowLeftIcon className='h-5 w-5 mx-2'/> Back To seats</button>
                                    <div className=' h-[30rem] flex flex-col justify-center items-center'>
                                        <div className="min-h-screen  flex flex-col justify-center sm:py-12">

                                                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                                                  <h1 className="font-bold text-center text-2xl text-red-600 mb-5">In order to book ticket pls login</h1>  
                                                  <div className="bg-[#111] shadow w-full rounded-lg ">
                                                    <div className="px-5 py-7">
                                                      <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                                                      <input onChange={(e)=>{setemail(e.target.value)}} value={email} type="email" className="border rounded-lg px-3 text-black py-2 mt-1 mb-5 text-sm w-full" />
                                                      <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                                                      <input onChange={(e)=>{setpassword(e.target.value)}} value={password} type="password" className="border rounded-lg text-black px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                                      <button  onClick={handleLogin}   type="button" className="transition duration-200 bg-gradient-to-r  MY-3 from-red-500/40 to-red-800/75 hover:bg-red-600   text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                                          <span className="inline-block mr-2">Log in</span>
                                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                          </svg>
                                                      </button>
                                                    </div>
                                       
                                                  </div>
                                                
                                                </div>
                                          </div>
                                    </div>
                               </section>}
                              <section className='embla__slide'> 
                                    <div className='flex bg-[#111111]' >
                                        <div className='flex-1 p-3'>
                                            <div className='flex justify-between items-center my-2'>

                                                <h1 className="text-red-600 text-3xl font-extrabold">Moonbeam Cinema</h1>
                                                {/* <p className='font-semibold'>Total price {total}</p> */}

                                            </div>
                                            <div className='flex justify-between items-center mt-5 py-3 border-b  border-white'>
                                              <h2 className='text-xl'>{movie.title}</h2>
                                              <h3 className='text-lg'>Tickets : {bookingSeats.length}</h3>
                                              {/* <h3>{cinema.split('-')[0]} {cinema.split('-')[1]}</h3> */}
                                            </div>

                                            <div className='flex justify-between border-b py-5  border-white'>
                                              <div className='space-y-3'>
                                                <h1 className='text-2xl'>Moonbean cinema fujairah</h1>
                                                <h2 className='text-xl'>{cinema.split('-')[0]} {cinema.split('-')[1]}</h2>
                                                <p className='text-lg my-3' >Seats {bookingSeats.map((seat,index)=>{
                                                  {
                                                    return <span key = {index}>{seat.seat} {index!==bookingSeats.length-1?",":""}</span>
                                                  }
                                                })}</p>
                                              </div>
                                    
                                               <p className='flex items-center justify-center text-2xl mr-5'>
                                                {time}
                                               </p>
                                            </div>

                                            <div className='space-y-3 border-b py-5  border-white'>
                                              <h2 className='text-xl'>Customer</h2>
                                              <h3 className='text-lg'>{user?.name}</h3>
                                            </div>

                                            <div className='flex justify-between border-b py-5  border-white'>
                                              <h2 className='text-xl'>Total price</h2>
                                              <h3 className='text-lg mr-3'>{total}$</h3>
                                            </div>
                                            <div className='flex justify-center items-end py-10 '>

                                                <button onClick={handleBuyNow} className='bg-gradient-to-r px-5 py-3 from-red-500/40 to-red-800/75 rounded-md'>Buy now</button>
                                                <button onClick={()=>{emblaApi.scrollPrev()}} className='bg-gradient-to-r px-5 py-3 '>cancel</button>

                                            </div>
                                       </div>
                                      <div>
                                      <img className='h-[600px] w-full' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="movie poster" />
                                      </div>

                                    </div>
                              </section> 
                          </div>
                    </div>
             </>
  )
}

export default Seats