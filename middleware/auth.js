function LocalVariables(req,res,next){
    req.app.locals={
        OTP:null,
        resetSession:null
    }
    next()
}

module.exports=LocalVariables