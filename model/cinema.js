const mongoose = require("mongoose")

const cinemaSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        unique:true
    },
    totalSeat:{
        type:Number,
        required:true
    },
    screenSize:{
        type:String,
        required:true
    },
    // seats:[
    // ],
    cols:{
        type:Number
    }
})

mongoose.models={} 
export default mongoose.model('cinema',cinemaSchema) 