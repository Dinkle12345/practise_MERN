const mongoose=require('mongoose')
const todoSchema=new mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:false
    }
});
const Todo=mongoose.model('Todo',todoSchema)
module.exports=Todo;