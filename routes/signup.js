const express = require('express');
const router = express.Router();
const config = require('../databaseConfig/mongodb');
// Import User model schema
const User = require('../models/users');

// Import Event Schema
const Event = require('../models/events');

// Import Appointment Schema
const Appoints = require('../models/appointments');

// Token & passportjs
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Register
router.post('/Register',(req,res,next) => {
    let newCust = new User({
        name: req.body.name,
        email: req.body.email,
        role:req.body.role,
        password:req.body.password
    });
    User.addUser(newCust,(err,user) => {
        if(err){
            res.json({success:false,msg:"failed to create a new customer",from:"server response"});
        }else{
            res.json({success:true,msg:"created a new customer",from:"server response"});            
        }
    });
});

// Authenticate
router.post('/authenticate',(req,res,next) => {
    const username = req.body.name;
    const password = req.body.password;
    User.getUserByName(username,(err,user) => {
        if(err) return res.json({ success:false, msg:"not kind of user 1" });
        if(!user){
            return res.json({ success:false, msg:"not kind of user 2"} );
        }
        User.comparePassword(password,user.password, (err,isMatch) => {
            if(err) throw err;
            if(isMatch){
                // jwt_payload only can be a plain object
                // jwt package sign() to generate token
                const token = jwt.sign({user : user},config.secret, { expiresIn: 604800 });
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user:{
                        id:user._id,
                        name:user.name,
                        role:user.role,
                        email:user.email
                    }
                });
            }else{
                return res.json({ success:false, msg:"not kind of user 3" });
            }
        });
    });
});
router.get('/profile',passport.authenticate('jwt',{session:false}),( req, res, next) => {
    res.json({ user: req.user });
});

// Exported update profile
router.put('/update',passport.authenticate('jwt',{session:false}),( req,res,next) => {
    let newProfile = {
        userid : req.body.id,
        name : req.body.name,
        email : req.body.email,
    };
    User.getUserbyId(newProfile.userid, (err, user) => {
        if(err) {
            res.json({success:false,msg:"something wrong"});
        }
        user.name = newProfile.name;
        user.email = newProfile.email;
        user.save((err, todo) => {
            if (err) {
                res.json({success:false,msg:"not updated"});
            }
            res.json({success:true,msg:"updated"});
        });
    });
});

// Create Event
router.post('/createEvent',( req,res,next)=>{
    let newEvent = new Event({
        title: req.body.title,
        author: req.body.author,
        date:req.body.date,
        place:req.body.place,
        content:req.body.content
    });
    Event.addEvent(newEvent,(err,event)=>{
        if(err){
            res.json({success:false,msg:"failed to create a new Event",from:"server response"});
        }else{
            res.json({success:true,msg:"created an new Event",from:"server response"});            
        }
    });
});

// GET all events
router.get('/allEvents',(req,res,next)=> {
   Event.findall((err,event) => {
       // Event is an ARRAY response
        if(err) return res.json({ success:false, msg:"not success" });
        if(!event){
            return res.json({ success:false, msg:"not kind of user 2"} );
        }else{
            res.json({
                success: true,
                event: event
            });
        }
   });
    
});

// GET events by author name
router.post('/events',(req,res,next) => {
    let author = req.body.author;
    Event.findByName(author,(err,events) => {
        if(err) res.json({success:false,msg:"failed find"});
        if(!events){
            res.json({success:false, msg:"no events"});
        }else{
            res.json({success:true, events : events});
        }

    });
});


// Update selected event
router.put('/updateevent',(req,res,next)=>{
    let selected_event = {
        _id:req.body._id,
        title:req.body.title,
        author:req.body.author,
        date:req.body.date,
        place:req.body.place,
        content:req.body.content
    };
    Event.getEventById(selected_event._id,(err, event) => {
        if(err) res.json({success:false,msg:"something wrong"});
        event.title = selected_event.title;
        event.date = selected_event.date;
        event.place = selected_event.place;
        event.content = selected_event.content;
        event.save(err => {
            if(err) res.json({success:false,msg:"not updated"});
            res.json({success:true,msg:"updated"});
        });
    });

});

// Appointments
// Create Appointment
router.post('/appointment',(req,res,next) => {
    let newAppoints = new Appoints({
        subject: req.body.subject,
        date: req.body.date,
        place: req.body.place,
        participant: req.body.participant,
        status: req.body.status
    });
    Appoints.addAppointment(newAppoints, (err,todo) => {
        if(err){
            res.json({success:false,msg:"failed to create!"});
        }else{
            res.json({success:true,msg:"success created"});
        }
    });
});

// Update Appointment
router.put('/updateAppointment', (req,res,next) => {
    let appointment = {
        _id : req.body._id,
        subject : req.body.subject,
        date : req.body.date,
        place: req.body.place,
        participant: req.body.participant,
        status: req.body.status
    };
    Appoints.findAppointmentById(appointment._id,(err, resappoint) => {
        if(err) res.json({success:false,msg:"failed"});
        // resappoint.subject = appointment.subject;
        // resappoint.date = appointment.date;
        // resappoint.place = appointment.place;
        console.log(appointment.status);
        console.log(appointment);
        resappoint.status = appointment.status;
        resappoint.save(err => {
            if(err) res.json({success:false,msg:"not updated"});
            res.json({success:true,msg:"updated"});
        });
    });
});

// Get all Appointment
router.get('/appointments',(req,res,next) => {
    Appoints.findAllAppointments((err,appoints) => {
        if(err) res.json({success:false,msg:"failed find"});
        if(!appoints){
            res.json({success:false,msg:"failed find"});
        }else{
            res.json({success:true,msg:"find all", appoints: appoints});
        }
    });
});

// Get one person's Appointment
router.post('/specificappointments',(req,res,next) => {
    let participant = req.body.participant;
    Appoints.findAppointmentByName(participant, (err, appoints) => {
        if(err) res.json({success:false,msg:"failed"});
        if(!appoints){
            res.json({success:false,msg:"failed"});
        }else{
            res.json({success:true,msg:"success", appoints:appoints});
        }
    });
});

module.exports = router;