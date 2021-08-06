const mongoose = require("mongoose");

const signupDesign = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword : {
        type : String,
        required : true
    },
    img : {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('mytable', signupDesign)