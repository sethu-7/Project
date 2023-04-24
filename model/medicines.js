const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medSchema = new Schema({
    image:String,
    name: String,
    m_id: Number,
    cost: Number,
    description: String,
    added: String,

})

module.exports = mongoose.model('medicines', medSchema);



