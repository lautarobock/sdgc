

//Connect to Mongoose
(async () => {
    try {
        await require("mongoose").connect(process.env.MONGOLAB_URI);

        var model = require('./server/domain/model');
    
        const goalkeepers = ['River'] //(await model.Player.find({ goalkeeper: true })).map(p => p._id);
        console.dir(goalkeepers);
        const matches = await model.Match.find({ players: { $in: goalkeepers } });
        for (const match of matches) {
            // console.log(match)
            const member1 = match.team1.members.find(m => goalkeepers.indexOf(m.player) !== -1);
            if (member1) {
                member1.goalkeeper = true;
            }
            
            const memberB = match.teamB.members.find(m => goalkeepers.indexOf(m.player) !== -1);
            if (memberB) {
                memberB.goalkeeper = true;
            }
            await match.save();
        }
    } catch (err) {
        console.error(err);
    } finally {
        await require("mongoose").disconnect();
    }
})();
