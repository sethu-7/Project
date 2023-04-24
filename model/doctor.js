

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    
    name: String,
    password: String,
    phoneNumber: Number,
    email: { type : String , unique : true },
    district:String,
    Specialization: String,
    // fee:Number,
    experience: Number,
    address: String,
    timeslot1:String,
    timeslot2:String,
    timeslot3:String,
    file:{
        type:String
    }



})




module.exports = mongoose.model('doctor_final', doctorSchema);



