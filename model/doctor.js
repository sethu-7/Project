

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    images:[
        {
            type:String
        }
    ],
    doc_name:String,
    doc_id:String,
    spcl:String,
    // fee:Number,
    exp:Number,
    address:String,
    ph_no:Number,
    email:String


    
})




module.exports = mongoose.model('doctor',doctorSchema);

