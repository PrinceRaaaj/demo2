const express = require('express');
const router  = express.Router();
const signupDesignCopy = require('../model/SignupModel')
const bcrypt = require('bcrypt');
const { response } = require('express');


router.post('/SignUp', async (request, response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

   signupDesignCopy.findOne({username : request.body.username}, (err, signedupUser) => {
        if(signedupUser){
            response.send({message : "User is there with same name"})
             
         }
        else{
            const signedupUser = new signupDesignCopy({
                username : request.body.username,
                email : request.body.email,
                password : securePassword,
                confirmpassword : request.body.confirmpassword,
                img : request.body.img  
            })
            signedupUser.save(err => {
                if(err){
                    response.send(err);
                }else{
                    response.send({
                        message : "Sign-up successfull, Please Login now"
                    })
                }
         
            }
            )
        }
    })

   
})
router.post('/SignIn', (request, response) => {
    signupDesignCopy.findOne({username : request.body.username}, (err, signedupUser) => {
        if(signedupUser){
                if(request.body.password === signedupUser.confirmpassword){
                        response.send({message: "login successfull", signedupUser : signedupUser})
                }else{
                    response.send({message : "wrong password"})
                }
        }else{
            response.send({message : "Unauthorized user please sign Up"})
        }
    })
})

module.exports = router 