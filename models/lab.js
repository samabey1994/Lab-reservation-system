const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema

const LabSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  lab: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  tslot: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  }

});

const Lab = module.exports = mongoose.model('Lab', LabSchema);




module.exports.addLab = function(newLab, callback){
      newLab.save(callback);
    }

    
//view all lab reservations
module.exports.getLab = function({}, callback){
  Lab.find({}, callback);
}

//view lab reservations by username
module.exports.getLabsByUsername = function(username, callback){
  const query = {username: username};
  Lab.find(query, callback);
}

//get lab by ID
module.exports.getLabById = function(id,callback){
  Lab.findById(id,callback);
}

// delete my reservation
module.exports.deleteReservation = function(id,callback){
  const query = {_id: id};
  Lab.remove(query,callback);
}

// edit my reservation
module.exports.editReservation = function(id,eReservation,callback){
  
  const query = {_id: id};
  Lab.update(query,eReservation,callback);
}

// get lab by date & lab name
module.exports.getResbyDateLab = function(rDate,rLabname,callback){
  const query = {date:rDate, labname:rLabname};
  Lab.find(query,callback);
}

// get lab by date
module.exports.getLabbyDate = function(rDate, callback){
  const query = {date:rDate};
  Lab.find(query,callback);
}



