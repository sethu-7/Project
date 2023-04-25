// const {MongoClient} = require('mongodb');
// const url = 'mongodb+srv://epshita0sarkar0:gegWAteamV4SvaSe@patients.teanfpt.mongodb.net/test';
// const client = new MongoClient(url);



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    
    patient_name: String,
    patient_password: String,
    patient_phoneNumber: Number,
    patient_email: String,
    patient_address:String,
    patient_emergencyNumber: Number,
    patient_dateOfConsultation:{
        type: String,
        default: Date.now
    },
    patient_timeOfConsultation:{
        type: String,
        default:"25-4-2023"
    },
    patient_online: {
        type: String,
        default: "Yes",
    },
    patient_offline: {
        type:String,
        default:"No"
    },
    patient_doctor: {
        type: String,
        default: "geethu@gmail.com"
    }
})


module.exports = mongoose.model('patients', patientSchema);