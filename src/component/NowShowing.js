"use client"
import React, { useEffect, useState } from 'react'
import {now_playing} from "../../src/fetchMethods"
import { genre_id } from '@/data/genre_id'
import Image from 'next/image'
import Link from 'next/link'

const NowShowing = () => {

    const [upcommingmovies, setupcommingmovies] = useState(null)

    useEffect(() => {
      
       const  upcommingMoviesFunc = async ()=>{

           const movies = await now_playing()
            setupcommingmovies(movies)
        }
        upcommingMoviesFunc()
        
    }, [])
    

    // console.log(upcommingmovies);

  return (
    <div className='max-w-7xl mx-auto'>
        <h2 className='text-2xl font-medium w-fit border-b-4 border-b-red-600 my-4'>Now Showing</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 ">


            {upcommingmovies?.results.map((movie)=>{

            return <div className="m-5 h-full overflow-hidden" key={movie.id}>

                        <Link href={`/movie/${movie.id}`}>
                            <Image alt={movie.id} height={200} width={400} className="hover:scale-110 transition duration-500  w-full" src={` https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
                        </Link>

                        {/* <h3 className='text-xl font-medium text-center my-1'>{movie.title}</h3> */}

                            {/* <div className='flex flex-wrap  my-1'>
                                    {movie.genre_ids.map((id,index)=>{

                                        const genreObject = genre_id.find(genreObj => genreObj.id === id);

                                        return <div className='text-white bg-white/25 m-1 py-1 px-2 rounded-full'>{genreObject.genre}</div>


                                    })}
                            </div> */}

                    </div>

            })
            }


        </div>
    </div>
)
}

export default NowShowing