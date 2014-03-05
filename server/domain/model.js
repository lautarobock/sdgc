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
    alias: String,
    bornDate: Date,
    starting: Boolean //si es titular o no
},{ _id: false }));

exports.League = mongoose.model("League", new Schema({
    _id: String,
    name: String,
    status: {type: String, default: 'PLANNING'}, //PLANNING, RUNNING, FINISHED
    startDate: Date,
    finishDate: Date,
    matches: [{type: String , ref: 'Match'}] //No lo estoy usando
},{ _id: false }));

var Team = {
    members: [{
        podium: Number,
        goals: Number,
        beers: Number,
        player: {type: String,  ref:'Player'}
    }],
    otherGoals: Number, //En contra, no contados
    goals: Number,
    avg: Number,
    isWinner: Boolean
};

exports.Match = mongoose.model("Match", new Schema({
    _id: String,
    league: {type: String, ref: 'League'},
    round: Number,
    status: {type: String, default: 'PLANNING'}, //PLANNING, READY, FINISHED
    date: Date,
    players: [{type: String, ref:'Player'}],
    team1: Team,
    teamB: Team
},{ _id: false }));