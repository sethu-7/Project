

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    
    name: String,
    password: String,
    phoneNumber: Number,
    email: String,
    address:String,
    Specialization: String,
    // fee:Number,
    experience: Number,
    address: String,
    file:{
        type:String
    }



})




module.exports = mongoose.model('doctor_final', doctorSchema);



