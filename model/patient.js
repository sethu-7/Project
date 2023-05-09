// const {MongoClient} = require('mongodb');
// const url = 'mongodb+srv://epshita0sarkar0:gegWAteamV4SvaSe@patients.teanfpt.mongodb.net/test';
// const client = new MongoClient(url);



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    
    patient_name: {
        type:String,
        default:"Epshita Sarkar"
    },
    patient_password: {
        type:String,
        default:"QWE!@#123qwe"
    },
    patient_phoneNumber: {
        type:Number,
        default:"9090908787"
    },
    patient_email: {
        type:String,
        default:"epshita@gmail.com"
    },
    patient_address:{
        type:String,
        default:"Mumbai"
    },
    patient_emergencyNumber: {
        type:Number,
        default:"8787879090"
    },
    patient_dateOfConsultation:{
        type: String,
        default: Date.now
    },
    patient_timeOfConsultation:{
        type: String,
        default:"26-4-2023"
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