const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../databaseConfig/mongodb');
// Create model schema
const EventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required:true
    },
    date: {
        // Careful for date formate is MM-DD-YYYY
        type: String,
        required:true
    },
    place:{
        type: String,
        required:true
    },
    content: {
        type: String,
        required: true
    }
});
const Event = module.exports = mongoose.model('Event',EventSchema);

module.exports.addEvent = function(newEvent,callback){
    newEvent.save(callback);
}

module.exports.findall = function(callback){
    const query = {};
    Event.find(query, callback);
}
module.exports.findByName = function(authorname, callback){
    query = { author : authorname };
    Event.find(query,callback);
}

module.exports.getEventById = function(_id,callback){
    Event.findById(_id,callback);
}