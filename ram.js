const mongoose=require('mongoose')
const studentSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    }
})
const Student=mongoose.model('Student',studentSchema)
module.exports=Student