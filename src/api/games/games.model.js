const mongoose = require('mongoose');
const Schema =mongoose.Schema

const GameSchema = new Schema({
    name: {type: String, required: true, trim:true},
    img: {type: String, required: true, trim:true},
    type: [{type: Schema.Types.ObjectId, ref: "type", required: true}],
    year: {type: Number, required: true, trim:true},
    characters: {type: String, required: true, trim:true},
    platform: [{type: Schema.Types.ObjectId, ref: "platform", required: true}]
}, {timestamp: true, collection: 'games'})

const Game = mongoose.model('game', GameSchema)
module.exports = Game




///DOCUMENTACIÓN

//TLOU --> Action-adventure
//SMITE --> Moba
//CS:GO --> Shooter
//Resident Evil --> Third-person shooter
//Time crisis --> Rail shooter
//Mario64 --> Platform
//Fifa22 --> Sports
//Clash of clans --> Strategy
//Clash Royale --> Strategy
//Path of exile --> MMORPG
//Lineage2 --> MMORPG
//Mu Online --> MMORPG
//Final Fantasy --> MMO
//Need for Speed --> Racing


// Action-adventure -> 61e13f5e2b15a0f57d6e03ac
// Moba --> 61e13fa32b15a0f57d6e03ba
// Shooter --> 61e13f712b15a0f57d6e03b2
// Platform --> 61e157398f9f66a9efa1e100
// Sports --> 61e1574b8f9f66a9efa1e103
// Strategy --> 61e157568f9f66a9efa1e106
// RPG --> 61e157698f9f66a9efa1e109
// Racing --> 61e157788f9f66a9efa1e10c

//PS4 --> 61e13ae3e2fd932a06150d1e
// PS5 --> 61e13aefe2fd932a06150d21
//XBOX360 --> 61e13af6e2fd932a06150d24
//XBOXOne --> 61e13afbe2fd932a06150d27
//PC --> 61e13affe2fd932a06150d2a
//Mobile --> 61e155139899e54618c4eac4
//Switch --> 61e15859f39d0c27902d94a1
//PS2--> 61e16495a83477ddd4d76b01