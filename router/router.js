const{ Router } =require("express");
const UserModel = require("../Model/UserModel.js")
const bcrypt= require("bcrypt")
const ENV =require( "../config.js")
const jwt=require("jsonwebtoken")
const router=Router()


// import all controllers

// post method
router.post("/register",
  function  (req,res){

    }
)
// send the mail
router.route('/registerMail').post()
// authenticate user
router.route('/authenticate').post()
// login in the app
router.route('/login').post()



// get method


router.route('/user/:username').get()
// generate OTP
router.route('/generateOTP').get()
// verify OTP
router.route('/verifyOTP').get()

// reset all the variables
router.route('/createResetSession').get()

// put method
router.route("/updateUser").put()

router.route("/resetPassword").put()



module.exports=router