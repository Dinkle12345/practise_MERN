const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const Student=require('./ram')
// const Todo=require('./TodoSchema')
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb+srv://dinklemanikanta:root@cluster0.twquy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log(err)
})
app.get('/',(req,res)=>{
    res.status(200).send("Hello World")
})
app.post('/addtodo',async(req,res)=>{
    try{
        const {todo,status}=req.body
        const newTodo=new Todo({
            todo,
            status
        })
        await newTodo.save()
        res.status(200).json(await Todo.find())
    }
    catch(err){
        res.status(500).json(err)
    }
})
app.post('/register',async(req,res)=>{
    try{
        const {username,email,password,mobile}=req.body
        const user=new Student({
            username,
            email,
            password,
            mobile
        });
        await user.save();
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})
app.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body
        const   user=await Student.findOne({username,password})   
        if(user){
            user.password === password?res.status(200).json(user):res.status(400).json("password incorrect")
        }
        else{
            res.status(400).json("user not found")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
});
app.get('/profile/:username',async(req,res)=>{
    try{
        const user=await Student.findOne({username:req.params.username})
        if(user){
            res.status(200).json(user)
        }
        else{
            res.status(400).json("user not found")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})
app.put('/update/:username',async(req,res)=>{
    try{
        const user=await Student.findOneAndUpdate({username:req.params.username},req.body,{new:true})
        if(user){
            res.status(200).json(user)
        }
        else{
            res.status(400).json("user not found")
        }
    }   
    catch(err){
        res.status(500).json(err)
    }
})
app.listen(process.env.PORT || 5000,()=>{
    console.log("Server is started")
})