const mongoose=require( "mongoose")
const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"Please provide a firstname"],
    },
    lastname:{
        type:String,
        required:[true,"Please provide a lastname"],
    },
    
    password:{
        type:String,
        required:[true,"Please provide a password"],
        unique:true,
        maxLength:70
    },
    email:{
        type:String,
        required:[true,"Please provide a unique email"],
        unique:true
    }
})
module.exports= mongoose.model.Users|| mongoose.model("User",UserSchema)