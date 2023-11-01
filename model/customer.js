const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        requied:true,
        type:String
    },
    // isGuest:{
    //     required:true,
    //     type:Boolean
    // }
})

mongoose.models={} 
export default mongoose.model('customer',customerSchema) 