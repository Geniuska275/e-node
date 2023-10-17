// const UserModel = require("../Model/UserModel.js")
// const bcrypt= require("bcrypt")
// const ENV =require( "../config.js")
// const jwt=require("jsonwebtoken")




// export async function login(req,res){
//     const {email,password}=req.body
//         const {jwt}=pkg
//         console.log(jwt)
        
//         const user=  UserModel.findOne({email}).then(user=>{
//             bcrypt.compare(password,user.password,(err,result)=>{      
//             })

//             const token=  jwt.sign({
//                   userId: user._id,
//                   firstname:user.firstname,
//               },ENV.JWT_SECRET,{expiresIn:"24h"})

//               return res.status(200).send({msg:"Login Successful",
//                     firstname:user.firstname,
//                   token})
//                  })
            
           
       
// }

// // GET:http://localhost:8080/api/getUser

// export async function getUser(req,res){
//     res.json("getUser route")
// }

// // PUT:http://localhost:8080/api/updateUser

// export async function updateUser(req,res){
//     res.json("register route")
// }

// // GET:http://localhost:8080/api/generateOTP
// export async function generateOTP(req,res){
//     res.json("generate  route")
// }
// // GET:http://localhost:8080/api/verifyOTP
// export async function verifyOTP(req,res){
//     res.json("register route")
// }

// // GET:http://localhost:8080/api/createResetSession
// export async function createResetSession(req,res){
//     res.json("create session  route")
// }

// // PUT:http://localhost:8080/api/resetPassword
// export async function resetPassword(req,res){
//     res.json("reset password route")
// }

