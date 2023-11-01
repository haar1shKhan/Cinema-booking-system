'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect, useState } from 'react'
import { popular } from '../fetchMethods'
import {ChevronRightIcon,ChevronLeftIcon} from '@heroicons/react/24/solid'
import { genre_id } from '@/data/genre_id'
import Link from 'next/link'
const Slider = () => {


    const [popularMovies, setpopularMovies] = useState(null)
    const [emblaRef,emblaApi] = useEmblaCarousel({loop:true}, [Autoplay()])

   

    const Stringtrim =(string)=>{

        var maxLength = 250 // maximum number of characters to extract

        //trim the string to the maximum length
        var trimmedString = string.substr(0, maxLength);

        //re-trim if we are in the middle of a word
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

        return trimmedString + "..."
    }

    useEffect(() => {
      
       const  moviesFunc = async ()=>{

           const movies = await popular()
           setpopularMovies(movies)
        }
        moviesFunc()
        
    }, [])
    
  
      
        return (
          <div className="embla max-w-[100rem] mx-auto" ref={emblaRef}>
            <div className="embla__container">

              {

                  popularMovies?.results.map((movie)=>{
                    return <div className="relative h-[600px]  embla__slide" key={movie.id}>
            
                                <img className="absolute h-full  w-full object-cover" src={` https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
                                <div className='h-full w-full absolute bg-gradient-to-t from-black to-transparent z-40  '>

                                    <button className='absolute text-white top-1/2 left-4 p-2 hover:bg-black/50 rounded-full ' onClick={()=>emblaApi.scrollPrev()}><ChevronLeftIcon className=' h-10 w-10'/></button>
                                    <button className='absolute text-white top-1/2 right-4 p-2 hover:bg-black/50 rounded-full' onClick={()=>emblaApi.scrollNext()}><ChevronRightIcon className=' h-10 w-10'/></button>

                                    <div className='flex lg:flex-row h-full items-center  mt-[100px] ml-[100px]'>
                                        <div className='flex flex-col'>
                                            <h1 className='herotitle text-white text-xl lg:text-5xl  font-serif max-w-1xl'>{movie.title}</h1>
                                            
                                            <div className='flex space-x-2 my-2'>
                                                {movie.genre_ids.map((id,index)=>{
                                                    
                                                    const genreObject = genre_id.find(genreObj => genreObj.id === id);
                                                    
                                                    return <div key={index} className='text-white bg-white/25 py-1 px-2 rounded-full'>{genreObject.genre}</div>
                                                    
                                                    
                                                })}
                                            </div>

                                            <p className='w-1/2' >{Stringtrim(movie.overview)}</p>
                                            <Link className='my-2 bg-gradient-to-l w-fit to-red-700 from-red-800 py-2 px-5 rounded-md hover:bg-gradient-to-l   transform transition duration-1000' href={`/movie/${movie.id}`}>Buy now</Link>

                                        </div>
                                    </div>
                                   <div>

                                   </div>

                                </div>
                            </div>
                    
                    })

              }


            </div>
          </div>
        )
}

export default Slider