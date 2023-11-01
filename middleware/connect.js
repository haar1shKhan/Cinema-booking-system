
import mongoose from "mongoose";

const connectDb= async()=>{

    if(mongoose.connections[0].readyState){
        console.log('already conneted');
 
    }
        await mongoose.connect("mongodb://127.0.0.1:27017/cinemas")
        console.log('conneted');
}



export default connectDb 