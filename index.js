const mongoose=require("mongoose")
const Users=require("./Model/UserModel")
const  express =require("express")
const cors =require("cors")
const morgan =require("morgan")
const bcrypt= require("bcrypt")
// const ENV =require( "../config.js")
const jwt=require("jsonwebtoken")
const otpgenerator=require("otp-generator")
const LocalVariables=require("./middleware/auth")


const bodyParser=require( "body-parser");

const server=express()
const port=8080 || 5000 

// api route
// middlewares
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())
server.use(express.json())


server.use(cors({
    origin:"*"
}))
server.use(cors({
    methods:["POST","GET","PUT","PATCH"]
}))
server.use(morgan("tiny"))
server.get("/",(req,res)=>{ 
    res.send("backends")
})

const mongourl="mongodb+srv://Kingsley:aigbojie@cluster0.07yaxhz.mongodb.net/?retryWrites=true&w=majority"
// start server only when we have a valid connection
async function connect(){
    try {
        await mongoose.connect(mongourl)  
        console.log("connected to momgodb")     
    } catch (err) {
        console.log(err)
    }
}
connect()


async function verifyUser(req,res,next){
try {
    const {email}=req.method == "GET"? req.query:req.body 
    let exist=await Users.findOne({email})
    if (!exist){
        return res.status(404).send({error:"cannot find user"})
    }
    next()
} catch (error) {
    return res.status(404).send({error:"Authentication error"})
}
}
server.post("/register",(req,res)=>{
           const {firstname,lastname,password,email}=req.body       
            bcrypt.hash(password,10).then(hashedPassword=>{
             const user=new Users({
                firstname,
                lastname,
                password:hashedPassword,
                email})     
             user.save().then(()=>{
                 res.status(201).send({msg:"user successfully created"})
             })})

             
        
})

server.post("/login",verifyUser,(req,res)=>{
    try {
        const{email,password}=req.body
        const user=  Users.findOne({email}).then(user=>{
            bcrypt.compare(password,user.password,(err,result)=>{      
            })
            const token=  jwt.sign({
                  userId: user._id,
                  firstname:user.firstname,
              },"deborah",{expiresIn:"24h"})
              return res.status(200).send({msg:"Login Successful",
                    firstname:user.firstname,
                  token})
                 })                    
                   
    } catch (error) {
        res.status(401).send({msg:"login failed"})
        
    }
})
server.get("/users",async (req,res)=>{
    try {
      const users=await  Users.find()
      res.status(200).send(users)
    } catch (e) {
        res.status(404).send({msg:"could not get users"})
    }
})

server.get("/user/:firstname",async (req,res)=>{
    const {firstname}=req.params
    try {
        if(!firstname)return res.status(501).send({error:"invalid firstname"})
        console.log(firstname)
      const user= await Users.findOne({firstname})
      const {password,...rest}=Object.assign({},user.toJSON())
      return res.status(201).send(rest)
    } catch (error) {
        return res.status(404).send({error:"Cannot find User Data"})
    }
})
server.put("/updateUser",(req,res)=>{
    try {
        const {id}=req.query
        if(id){
            const body=req.body
            Users.updateOne({_id:id},body)
            return res.status(201).send({msg:"Record Updated"})
        }else{
            return res.status(404).send({error:"User not Found..."})
        }
    } catch (error) {
        
    }
})

server.get("/generateOTP",verifyUser,LocalVariables,async(req,res)=>{
   req.app.locals.OTP= otpgenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
   res.status(201).send({code:req.app.locals.OTP})
})

server.get("/verifyOTP",async(req,res)=>{
    const {code}=req.query
    if(parseInt(req.app.locals.OTP)===parseInt(code)){
        // reset the OTP VALUE
        req.app.locals.OTP=null
        // start session for reset
        req.app.locals.resetSession=true
        return res.status(201).send({msg:"verify successfully"})
    }
    return res.status(400).send({error:"Invalid OTP"})
})
server.get("/createResetSession",(req,res)=>{
    if(req.app.locals.resetSession){
        req.app.locals.resetSession=false
        return res.status(201).send({msg:"Access Granted"})
    }
    return res.status(440).send({msg:"session Expired"})
})

server.put("/resetPassword",verifyUser,(req,res)=>{
    try {
            if(!req.app.locals.resetSession) return res.status(440).send({msg:"session expired"})
            const {email,password}=req.body
            const user= Users.findOne({email})    
             bcrypt.hash(password,10).then(hashedPassword=>{
                Users.updateOne({email:user.email},{password:hashedPassword}).then(result=>{
                    return res.status(201).send({msg:"reset password successful"})
                })
        }).catch(error=>{
            return res.status(404).send({msg:"User not found"})
        })
    } catch (error) {
        
    }
})
server.listen(port,()=>{
    console.log(`server listening to ${port}`)
})  

module.exports=server