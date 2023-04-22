// const {MongoClient} = require('mongodb');
// const url = 'mongodb+srv://epshita0sarkar0:gegWAteamV4SvaSe@patients.teanfpt.mongodb.net/test';
// const client = new MongoClient(url);



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    
    name: String,
    password: String,
    phoneNumber: Number,
    email: String,
    district:String,
    emergencyNumber: Number
})




module.exports = mongoose.model('Patients', patientSchema);