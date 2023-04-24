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
    patient_dateOfConsultation: Date,
    patient_timeOfConsultation: String,
    patient_online: String,
    patient_offline: String,
    patient_doctor: String
})


module.exports = mongoose.model('patients', patientSchema);


