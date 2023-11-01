// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { bookSeat, stripePayment } from "@/fetchMethods"
import { NextResponse } from 'next/server'
import { headers } from 'next/headers';
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// connectDb()

export const POST= async (req)=>{
    try{
      
    
   
    
    const data= await req.text()
    const dataJson = await JSON.parse(data)
    // console.log({dataJson:});
    // const {seats} =await  JSON.parse(data)
    
    // console.log('data',data);

    // const session = await stripePayment(movie.title,bookingSeats)

    const sig = headers().get('Stripe-Signature') ;
    // console.log("sig",sig);
    let event = stripe.webhooks.constructEvent(data, sig,process.env.STRIPE_SECRET_ENDPOINT_SECRET);

    if (event.type === 'checkout.session.completed') {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.

        const customer = await stripe.customers.retrieve(dataJson.data.object.customer)
        const metadata = await JSON.parse(customer.metadata.seatDetail)
        // console.log({metadata});

        metadata.map((data)=>{
          const jsonFormat = JSON.parse(data)
          bookSeat(jsonFormat.seatId,jsonFormat.userId,jsonFormat.time)
        })

        // const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        //   event.data.object.id,
        //   {
        //     expand: ['line_items','customer_details'],
        //   }
        // );
        // const lineItems = sessionWithLineItems.line_items;
        // const customerDetails = sessionWithLineItems.customer_details;
        // // console.log({lineItems:lineItems,customerDetails});
        // const user = customerDetails.email

        // lineItems.data.map(data=>{
          
        //   const seatId = data.description.split('_')[0];
        //   const time = data.description.split('_')[3];
        //   // console.log('api',time);
            
        //     bookSeat(seatId,user,time)
        // })
        //  seats.map(seat=>{
        //  })

       
      }

    // console.log(event);
    return  NextResponse.json({ event })
        


    } catch(e) {

        console.log(e);
        return  NextResponse.json({  isSuccess:false,msg:"some error occured"+e.messsage })
    }

}

