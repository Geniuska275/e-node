import UserModel from "../Model/UserModel.js"
import bcrypt from "bcrypt"


export async function register(req,res){
    try {
        const {firstname,lastname,password,email}=req.body
        
        
        
        

        const hashedPassword= bcrypt.hash(password,10)
        console.log(hashedPassword)
        const user=new UserModel({firstname,lastname,password,email})
        console.log(user)
        user.save().then(()=>{
            res.status(201).send({msg:"user successfully created"})
        })


        // Promise.all([existFirstname,existEmail]).then(()=>{
        //     if(password){
        //     const hashedPassword= bcrypt.hash(password,10)
        //     console.log(hashedPassword)
        //     }

        // }).catch(error=>{
        //     return res.status(500).send(error)
        // })
        
    } catch (error) {
        return res.status(500).send(error)
        
    }
}

export async function login(req,res){
    res.json("login route")
}

// GET:http://localhost:8080/api/getUser

export async function getUser(req,res){
    res.json("getUser route")
}

// PUT:http://localhost:8080/api/updateUser

export async function updateUser(req,res){
    res.json("register route")
}

// GET:http://localhost:8080/api/generateOTP
export async function generateOTP(req,res){
    res.json("generate  route")
}
// GET:http://localhost:8080/api/verifyOTP
export async function verifyOTP(req,res){
    res.json("register route")
}

// GET:http://localhost:8080/api/createResetSession
export async function createResetSession(req,res){
    res.json("create session  route")
}

// PUT:http://localhost:8080/api/resetPassword
export async function resetPassword(req,res){
    res.json("reset password route")
}

