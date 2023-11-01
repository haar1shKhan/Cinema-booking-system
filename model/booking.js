const mongoose = require("mongoose")

const bookingSchema= mongoose.Schema({
    seatId:{
        required:true,
        // unique:true,
        type:String   
    },
    isBooked:{
        required:true,
        type:Boolean
    },
    cinema:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'cinema'
    },
    price:{
        type:Number,
        default:0
    },
    // customerEmail:{
    //     type:String,
    //     default:null
    // },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer',
        default:null
    },
    isVip:{
        required:true,
        type:Boolean
    },
    time:{
        type:String
    },
    movieId:{
        required:true,
        type:String
    }
})

mongoose.models={} 
export default mongoose.model('booking',bookingSchema) 