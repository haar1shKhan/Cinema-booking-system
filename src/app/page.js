
import Navbar from "@/component/Navbar";
import NowShowing from "@/component/NowShowing";
import Slider from "@/component/Slider";
import Image from "next/image";



export default  function Home() {



  // console.log(movies.results);

  return (
    <main className="">
      
    {/* Slider */}
    <div>
      <Slider/>
    </div>
    
    {/* now showing */}
    <NowShowing/>

    

    </main>
  )
}


