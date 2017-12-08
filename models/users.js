// Models is used to interact with Mongodb and 
const mongoose = require('mongoose');
// Encrypt our password into Mongodb
const bcrypt = require('bcryptjs');
const config = require('../databaseConfig/mongodb');

// Create model schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    role: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
});

// Mongoose is node js tool set
const User = module.exports = mongoose.model('User',UserSchema);


// Expose users model functions
module.exports.getUserbyId = function(id,callback){
    User.findById(id,callback);
}
// Expose method : find user by name
module.exports.getUserByName = function(username, callback){
    const query = { name : username };
    User.findOne(query,callback);
}
// Expose method : create a new user
module.exports.addUser = function(newUser,callback){
    // From bcryptjs, which synchronously generates a salt (10 is default)
    // The first parameter is rounds number, the parameter is callback function 
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err,hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
module.exports.comparePassword = function(userPassword,passwordhash,callback){
    bcrypt.compare(userPassword,passwordhash,(err,isMatch) => { 
        if(err) throw err;
        callback(null,isMatch);
    });
} 
