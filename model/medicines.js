const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medSchema = new Schema({
    image:String,
    name: String,
    m_id: {
        type:Number,
        unique:true
    },
    cost: Number,
    description: String,
    added: {
        type:String,
        default:"false"
    }

})

module.exports = mongoose.model('medicines', medSchema);



