// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../../../middleware/connect"
import Cinema from "../../../../model/cinema"
import { NextResponse } from 'next/server'
connectDb()

export const POST= async (req)=>{
    try{
        const data = await req.json()
        // console.log(data);
       // Initialize an array to store the objects
        // const cinemaSeats = [];

        // // Define a variable to keep track of the seat letter
        // let seatLetter = 'A';

        // // Loop to create 60 objects with different IDs
        // for (let i = 2; i <=data.totalSeat; i++) {
        //   const seat = {
        //     id: seatLetter + i,
        //     isBooked: false,
        //     customer: '',
        //     isVip: false,
        //     movie: 'One Piece'
        //   };
        //   cinemaSeats.push(seat);
      
        //   // After every 8 seats, change the seat letter
        //   if (i % data.row === 1) {
        //     seatLetter = String.fromCharCode(seatLetter.charCodeAt(0) + 1);
        //   }
        // }

        

     

        let cinemas = await new Cinema({
            
            name: data.name,
            totalSeat: data.totalSeat,
            screenSize:data.screenSize,
            // seats:cinemaSeats,
            cols:data.cols
            
        })
        // console.log("data",cinemas)
        await cinemas.save()
    
        
      return NextResponse.json({  isSuccess:true,msg:"The query has been added" })

    } catch(e) {

        console.log(e);
        return  NextResponse.json({  isSuccess:false,msg:"some error occured"+e.messsage })
    }

}

