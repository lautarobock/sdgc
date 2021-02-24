var model = require('../domain/model.js');


function calculateTeamsForDuels(team1, teamB, result1, resultB, duelsMap) {

    for (var i = 0; i < team1.members.length; i++) {
        var memberI = team1.members[i];
        for (var j = 0; j < teamB.members.length; j++) {
            var memberJ = teamB.members[j];

            var result = result1;
            var players = [memberI.player, memberJ.player];
            var key = memberI.player + memberJ.player;

            if (!duelsMap[key]) {
                duelsMap[key] = {
                    key: key,
                    players: players,
                    count: 0, win: 0, lost: 0, even: 0
                }
            }
            var data = duelsMap[key];
            data.count++;
            if (result == 3) data.win++;
            if (result == 1) data.even++;
            if (result == 0) data.lost++;
        }

    }

}

function calculateTeamForPairs(team, result, pairsMap) {

    for (var i = 0; i < team.members.length; i++) {
        var memberI = team.members[i];
        for (var j = i + 1; j < team.members.length; j++) {
            var memberJ = team.members[j];

            var key = memberI.player + memberJ.player;

            if (memberI.player > memberJ.player) {
                key = memberJ.player + memberI.player;
            }

            if (!pairsMap[key]) {
                pairsMap[key] = {
                    key: key,
                    players: [memberI.player, memberJ.player],
                    count: 0, win: 0, lost: 0, even: 0
                }
            }
            var data = pairsMap[key];
            data.count++;
            if (result == 3) data.win++;
            if (result == 1) data.even++;
            if (result == 0) data.lost++;
        }

    }

}

//result: 0,1,3 (for lost, even or win)
//and *cohef is using for players
function calculateTeam(team, result, playersMap, cohef, goalsReceived) {
    for (var i = 0; i < team.members.length; i++) {
        var member = team.members[i];
        if (!playersMap[member.player]) {
            playersMap[member.player] = {
                player: member.player,
                count: 0, win: 0, lost: 0, even: 0, points: 0, goalsCount: 0, goals: 0, goalAvg: 0, goalMax: 0,
                beersCount: 0, beers: 0, beerAvg: 0, podium1: 0, podium2: 0, podium3: 0, historic: 0,
                goalsReceived: 0, goalkeeperCount: 0,
                streakMatches: 0,
                lastMatch: false,
                lastStreakMatches: 0,
                streakWins: 0,
                lastStreakWins: 0,
                streakLosses: 0,
                lastStreakLosses: 0,
                streakNoLosses: 0,
                lastStreakNoLosses: 0
            }
        }
        var data = playersMap[member.player];
        data.count++;
        if (result == 3) data.win++;
        if (result == 1) data.even++;
        if (result == 0) data.lost++;
        data.points += result;
        data.historic += result * (cohef || 1);
        if (member.goals != null) {
            data.goals += member.goals;
            data.goalsCount++;
            data.goalMax = Math.max(data.goalMax, member.goals);
        }
        if (member.beers != null) {
            data.beers += member.beers;
            data.beersCount++;
        }

        if (member.podium == 1) data.podium1++;
        if (member.podium == 2) data.podium2++;
        if (member.podium == 3) data.podium3++;
        if (member.goalkeeper) {
            data.goalsReceived += goalsReceived;
            data.goalkeeperCount++;
            console.log(data.goalsReceived);
        }

        if (result === 3) {
            data.lastStreakWins++;
            if (data.lastStreakWins > data.streakWins) {
                data.streakWins = data.lastStreakWins;
            }
        } else {
            data.lastStreakWins = 0;
        }

        if (result === 0) {
            data.lastStreakLosses++;
            if (data.lastStreakLosses > data.streakLosses) {
                data.streakLosses = data.lastStreakLosses;
            }
        } else {
            data.lastStreakLosses = 0;
        }

        if (result !== 0) {
            data.lastStreakNoLosses++;
            if (data.lastStreakNoLosses > data.streakNoLosses) {
                data.streakNoLosses = data.lastStreakNoLosses;
            }
        } else {
            data.lastStreakNoLosses = 0;
        }
    }
}

function calculateMatchForDuels(match, stats) {
    if (!stats) {
        stats = { duelsMap: {} };
    }

    var result1;
    var resultB;
    if (match.winner == '1') {
        result1 = 3;
        resultB = 0;
    } else if (match.winner == 'B') {
        result1 = 0;
        resultB = 3;
    } else {
        result1 = 1;
        resultB = 1;
    }

    // calculateTeamsForDuels(match,result1,resultB,stats.duelsMap);
    calculateTeamsForDuels(match.team1, match.teamB, result1, resultB, stats.duelsMap);
    calculateTeamsForDuels(match.teamB, match.team1, resultB, result1, stats.duelsMap);

    return stats;
}

function calculateMatchForN(match, stats, n) {

}

function calculateMatchForPairs(match, stats) {
    if (!stats) {
        stats = { pairsMap: {} };
    }

    var result1;
    var resultB;
    if (match.winner == '1') {
        result1 = 3;
        resultB = 0;
    } else if (match.winner == 'B') {
        result1 = 0;
        resultB = 3;
    } else {
        result1 = 1;
        resultB = 1;
    }

    calculateTeamForPairs(match.team1, result1, stats.pairsMap);
    calculateTeamForPairs(match.teamB, resultB, stats.pairsMap);

    return stats;
}

/**
* @params cohef valor para hacer ranking historico segun los ulitmos partidos
*/
function calculateMatch(match, stats, cohef) {
    if (!stats) {
        stats = { playersMap: {} };
    }

    var result1;
    var resultB;
    if (match.winner == '1') {
        result1 = 3;
        resultB = 0;
    } else if (match.winner == 'B') {
        result1 = 0;
        resultB = 3;
    } else {
        result1 = 1;
        resultB = 1;
    }

    calculateTeam(match.team1, result1, stats.playersMap, cohef, match.teamB.goals);
    calculateTeam(match.teamB, resultB, stats.playersMap, cohef, match.team1.goals);
    Object.keys(stats.playersMap).forEach(p => {
        if (match.team1.members.some(m => m.player === p) ||
            match.teamB.members.some(m => m.player === p)) {
            if (stats.playersMap[p].lastMatch) {
                stats.playersMap[p].lastStreakMatches++;
            }
            stats.playersMap[p].lastMatch = true;
            if (stats.playersMap[p].lastStreakMatches > stats.playersMap[p].streakMatches) {
                stats.playersMap[p].streakMatches = stats.playersMap[p].lastStreakMatches;
            }
        } else {
            stats.playersMap[p].lastStreakMatches = 0;
            stats.playersMap[p].lastMatch = false;
        }
    })
    return stats;
}

/**
Dada una lista de partidos calcula estadisticas por jugador.
- Partidos jugados
- Ganados
- Empatados
- Perdidos
- Puntos
- Goles
- Promedio Birras
- Cant Podios 1º
- Cant Podios 2º
- Cant Podios 3º
- Goles recibidos
*/
function calculate(matches) {
    var stats = {
        playersMap: {},
        general: {
            count: matches.length
        }
    }


    for (var i = 0; i < matches.length; i++) {
        calculateMatch(matches[i], stats, 1 - i / matches.length);
    }

    stats.byPlayer = [];
    for (var k in stats.playersMap) {
        var player = stats.playersMap[k];
        player.beerAvg = (player.beers / player.beersCount) || 0;
        player.goalAvg = (player.goals / player.goalsCount) || 0;
        player.goalsReceivedAvg = (player.goalsReceived / player.goalkeeperCount) || 0;
        stats.byPlayer.push(player);
    }

    return stats;
};

function calculateForPairs(matches) {
    var stats = {
        pairsMap: {},
        general: {
            count: matches.length
        }
    }


    for (var i = 0; i < matches.length; i++) {
        calculateMatchForPairs(matches[i], stats);
    }

    stats.byPair = [];
    for (var k in stats.pairsMap) {
        var pair = stats.pairsMap[k];
        stats.byPair.push(pair);
    }

    return stats;
};

function calculateForDuels(matches) {
    var stats = {
        duelsMap: {},
        general: {
            count: matches.length
        }
    }

    for (var i = 0; i < matches.length; i++) {
        calculateMatchForDuels(matches[i], stats);
    }

    stats.byDuel = [];
    for (var k in stats.duelsMap) {
        var duel = stats.duelsMap[k];
        stats.byDuel.push(duel);
    }

    return stats;
};

function calculateForPairsFor(req, res) {
    //Caso para calcular una liga hasta determinada ronda
    if (req.query.league && req.query.upToRound) {
        model.Match.find({ league: req.query.league, round: { $lte: req.query.upToRound } }, function (err, matches) {
            res.send(calculateForPairs(matches));
        });
    } else if (req.query.leagues) {
        if (!(req.query.leagues instanceof Array)) {
            req.query.leagues = [req.query.leagues];
        }
        model.Match.find({ league: { $in: req.query.leagues } }, function (err, matches) {
            res.send(calculateForPairs(matches));
        });
    } else {
        res.send({});
    }
};

function calculateForDuelsFor(req, res) {
    //Caso para calcular una liga hasta determinada ronda
    if (req.query.league && req.query.upToRound) {
        model.Match.find({ league: req.query.league, round: { $lte: req.query.upToRound } }, function (err, matches) {
            res.send(calculateForDuels(matches));
        });
    } else if (req.query.leagues) {
        if (!(req.query.leagues instanceof Array)) {
            req.query.leagues = [req.query.leagues];
        }
        model.Match.find({ league: { $in: req.query.leagues } }, function (err, matches) {
            res.send(calculateForDuels(matches));
        });
    } else {
        res.send({});
    }
}

function calculateFor(req, res) {
    //Caso para calcular una liga hasta determinada ronda
    if (req.query.league && req.query.upToRound) {
        model.Match.find({ league: req.query.league, round: { $lte: req.query.upToRound } })
            .sort('-date')
            .then(matches => res.send(calculate(matches)));
    } else if (req.query.leagues) {
        if (!(req.query.leagues instanceof Array)) {
            req.query.leagues = [req.query.leagues];
        }

        model.Match
            .find({ league: { $in: req.query.leagues } })
            .sort('-date')
            .then(matches => res.send(calculate(matches)));
    } else {
        model.Match
            .find()
            .exec(function (err, matches) {
                res.send(calculate(matches));
            });
        // res.send({});
    }
}


//public API
//Players
exports.calculate = calculate;
exports.calculateFor = calculateFor;
exports.calculateMatch = calculateMatch;

//Pairs
exports.calculateMatchForPairs = calculateMatchForPairs;
exports.calculateForPairs = calculateForPairs;
exports.calculateForPairsFor = calculateForPairsFor;

//Duels
exports.calculateMatchForDuels = calculateMatchForDuels;
exports.calculateForDuels = calculateForDuels;
exports.calculateForDuelsFor = calculateForDuelsFor;

//n
exports.calculateMatchForN = calculateMatchForN;
