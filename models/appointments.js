const mongoose = require('mongoose');
const config = require('../databaseConfig/mongodb');

const appointmentSchema = mongoose.Schema({
    subject : {
        type: String,
        required:true
    },
    date : {
        type:String,
        required:true
    },
    place : {
        type:String,
        required:true
    },
    participant :{
        type:String,
        required: true
    },
    status :{
        type: String,
        required: true
    }
});

const Appointment = module.exports = mongoose.model('Appointment',appointmentSchema);

// Create 
module.exports.addAppointment = function(newAppoints,callback){
    newAppoints.save(callback);
}
// Update - Owner
module.exports.findAppointmentById = function(appointmentID,callback){
    Appointment.findById(appointmentID,callback);
}

// Find By name - Customer
module.exports.findAppointmentByName = function(participantName,callback){
    let query = { participant : participantName };
    Appointment.find(query,callback);
}
// Find ALL owner
module.exports.findAllAppointments = function(callback){
    let query = {};
    Appointment.find(query,callback);
}