require("dotenv").config()
const nodemailer=require("nodemailer")
const mailgen=require("mailgen")
console.log(process.env.port)

const transporter=nodemailer.createTransport({
    service:"gmail",
    host:"smtp-gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.email,
        pass:process.env.password
    }
})

const mailOptions={
    from:{
     name:"R-Commerce",
     address:""
    },
    to:[""],
    subject:"Verification Code",
    text:"",
    html:""
}

const sendMail=async (transporter,mailOptions)=>{
    try {
        await transporter.sendMail(mailOptions).then(()=>{
            return res.status(201).json("email sent successfully")
        }).catch(error=>{
            return res.status(500).json(error)
        })
        console.log("email has been sent successfully")
    } catch (error) {   
        console.log(error)   
    }
}
sendMail(transporter,mailOptions)
