import { Router } from "express";
const router=Router()


// import all controllers

import * as controller from "../controllers/appController.js"

// post method
router.route('/register').post(controller.register)
// send the mail
router.route('/registerMail').post()
// authenticate user
router.route('/authenticate').post()
// login in the app
router.route('/login').post(controller.login)



// get method


router.route('/user/:username').get()
// generate OTP
router.route('/generateOTP').get(controller.generateOTP)
// verify OTP
router.route('/verifyOTP').get(controller.verifyOTP)

// reset all the variables
router.route('/createResetSession').get(controller.createResetSession)

// put method
router.route("/updateUser").put(controller.updateUser)

router.route("/resetPassword").put()



export default router