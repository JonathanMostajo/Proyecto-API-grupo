const mongoose = require('mongoose');
const Schema =mongoose.Schema

const TypesSchema = new Schema({
    name: {type: String, required: true, trim:true},
}, {timestamps: true, collection: 'type'})

const Types = mongoose.model('type', TypesSchema)
module.exports = Types