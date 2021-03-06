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
    starting: Boolean, //si es titular o no
    goalkeeper: {type:Boolean, default: false}
},{ _id: false }));

var Comment = {
    date: Date,
    user: {type: String, ref: 'User'},
    name: String,
    text: String
};

exports.League = mongoose.model("League", new Schema({
    _id: String,
    name: String,
    status: {type: String, default: 'PLANNING'}, //PLANNING, RUNNING, FINISHED
    startDate: Date,
    finishDate: Date,
    matches: [{type: String , ref: 'Match'}], //No lo estoy usando,
    comments: [Comment]
},{ _id: false, versionKey: false }));

var Team = {
    members: [{
        podium: Number,
        goals: Number,
        beers: Number,
        player: {type: String,  ref:'Player'},
        captain: Boolean,
        goalkeeper: Boolean
    }],
    otherGoals: Number, //En contra, no contados
    goals: Number,
    avg: Number,
    beers: Number
};

exports.Match = mongoose.model("Match", new Schema({
    _id: String,
    league: {type: String, ref: 'League'},
    round: Number,
    status: {type: String, default: 'PLANNING'}, //PLANNING, READY, FINISHED
    date: Date,
    players: [{type: String, ref:'Player'}],
    team1: Team,
    teamB: Team,
    winner: String, // 1,B,E,null (E para empate, null para no definido aun)
    podium: [{type: String, ref:'Player'}],
    diffGoals: Number,
    diffBeers: Number,
    diffAvg: Number,
    comments: [Comment],
    chanceWin1: Number,
    chanceWinB: Number,
    chanceEven: Number
},{ _id: false }));
