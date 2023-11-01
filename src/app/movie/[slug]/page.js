import Image from "next/image";

import { getMovie } from "../../../fetchMethods";
import Cinema from "@/component/Cinema";

export default async function Page({ params }) {

      const movie = await getMovie(params.slug)


  return <div className="space-y-10 mb-10 max-w-[100rem] mx-auto">
            <section className="relative h-[500px] overflow-hidden">
                <img className="absolute   w-full object-cover" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="Movie backdrop"/>
                <div className='h-[500px] w-full absolute bg-gradient-to-t from-black to-transparent z-40  '>
                    {/* <div className='flex lg:flex-row h-full items-center  mt-[100px] ml-[100px]'>
                            <h1 className=' text-white text-xl lg:text-5xl  font-serif max-w-1xl'>{movie.title}</h1>
                    </div> */}
                </div>
            </section>
            <section className="max-w-7xl mx-auto my-5 ">

              <div className="flex">

                    <img  className="h-[250px] w-[200px]" src={` https://image.tmdb.org/t/p/original/${movie.poster_path}`} />

                    <div className="ml-4 space-y-3">
                        <h2 className=" text-4xl font-bold">{movie.title}</h2>
                        <div className='flex flex-wrap w-[450px] space-x-2  my-4'>
                          {movie.genres.map((genre)=>{
                            
                            return <div key={genre.id} className='text-white bg-white/25 my-1 py-1 px-2 rounded-full '>{genre.name}</div>
                            
                            })}
                          
                      </div>
                      <p className="font-medium ">Language: <span className="bg-[#111] p-1 py-1 text-red-600 rounded-lg">{movie.original_language}</span></p>
                      <p className="font-medium ">Run time: {movie.runtime} min</p>
                      <p className="font-medium ">Release Date: {movie.release_date}</p>
                      <p className="font-medium ">Rating: {movie.vote_average.toFixed(1)/2} / 5</p>
                    </div>

              </div>

              <div className="my-5 space-y-4">
                 <h3 className="text-3xl font-semibold">Overview</h3>
                 <p className="font-medium">{movie.overview}</p>
              </div>
              <hr />
            </section>   

            <section className="max-w-7xl mx-auto space-y-9">
                <h3 className="text-3xl font-semibold">Booking</h3>

                <Cinema id={movie.id} name={'Cinema-1'}/>
                <Cinema id={movie.id} name={'Cinema-2'}/>
                <Cinema id={movie.id} name={'Cinema-3'}/>
                <Cinema id={movie.id} name={'Cinema-4'}/>
       
               

            </section>

 </div>

  
}