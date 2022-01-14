const mongoose = require('mongoose');
const Schema =mongoose.Schema

const PlatformsSchema = new Schema({
    name: {type: String, required: true, trim:true},
}, {timestamp: true, collection: 'platform'})

const Platforms = mongoose.model('platform', PlatformsSchema)
module.exports = Platforms