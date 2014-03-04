var mongoose = require('mongoose');
var Schema = mongoose.Schema;


exports.User = mongoose.model("User",new Schema({
    google_id: String,
    name: String,
    email: String,
    creationDate: Date,
    lastLoginDate: Date,
    isAdmin: Boolean
}));

exports.Player = mongoose.model("Player", new Schema({
    _id: String,
    name: String,
    lastName: String,
    bornDate: Date
},{ _id: false }));

exports.League = mongoose.model("League", new Schema({
    _id: String,
    name: String,
    status: String, //PLANNING, RUNNING, FINISHED
    startDate: Date,
    finishDate: Date
    // ,
    // matches: [{type: String , ref: 'Match'}]
},{ _id: false }));

