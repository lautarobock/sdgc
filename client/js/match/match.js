define(['../resources'], function() {

    var match = angular.module("afd.match", ["afd.resources"]);

    match.filter('notUsed', function() {
        return function(players, used) {
            if ( !used ) return players;
            return util.Arrays.filter(players, function(item) {
                return used.indexOf(item._id) == -1 ? 0 : -1;
            });
        }
    });

    match.filter('notUsedInTeam', function() {
        //plaers: [id,id,id]
        return function(players, match) {
            if ( !match || !players ) return players;
            return util.Arrays.filter(players, function(item) {
                var result1 = util.Arrays.filter(match.team1.members, function(sub) {
                    return sub.player == item ? 0 : -1;
                });
                if ( result1.length != 0 ) {
                    return -1;
                }
                var resultB = util.Arrays.filter(match.teamB.members, function(sub) {
                    return sub.player == item ? 0 : -1;
                });
                return resultB.length != 0 ? -1 : 0;
            });
        }
    });

    match.controller('MatchRunController', function($scope, $routeParams, Match, Player) {
        if ( $routeParams.match_id ) {
            $scope.match = Match.get({_id: $routeParams.match_id});
            $scope.playersMap = {};
            $scope.players = Player.query(function() {
                angular.forEach($scope.players, function(player) {
                    $scope.playersMap[player._id] = player;
                });
            });
        }

        function updateGoal(team) {
            team.goals = team.otherGoals||0;
            angular.forEach(team.members, function(member) {
                team.goals+=member.goals||0;
            });
            if ( $scope.match.team1.goals != null && $scope.match.teamB.goals != null  ) {
                if ( $scope.match.team1.goals > $scope.match.teamB.goals ) {
                    $scope.match.winner = '1';
                } else if ( $scope.match.team1.goals < $scope.match.teamB.goals ) {
                    $scope.match.winner = 'B';
                } else {
                    $scope.match.winner = 'E';
                }
            } else {
                $scope.match.winner = null;
            }
            $scope.save();
        }

        $scope.updateGoalB = function() {
            updateGoal($scope.match.teamB);
        };

        $scope.updateGoal1 = function() {
            updateGoal($scope.match.team1);
        };

         $scope.save = function() {
            $scope.match.$save(function(result) {
                console.log('SAVE', result);
            });
        };

        $scope.back = function() {
            window.location.href = 'index.html#/league/detail/' + $scope.match.league + '/' + $scope.match.round;
        };
    });

    match.controller("MatchEditController", function($scope,$routeParams,Match,$location, Player, $filter, PlayerPopup) {

        $scope.playersMap = {};
        $scope.players = Player.query(function() {
            angular.forEach($scope.players, function(player) {
                $scope.playersMap[player._id] = player;
            });
            $scope.addStarting();
        });


        if ( $routeParams.match_id ) {
            $scope.match = Match.get({_id: $routeParams.match_id});
        } else {
            $scope.match = new Match();
            $scope.match.round = parseInt($location.search().nextRound);
            if ( $location.search().nextDate ) {
                $scope.match.date = new Date(parseInt($location.search().nextDate));
            } else {
                $scope.match.date = new Date();
            }
            $scope.match.players = [];
            $scope.match.league = $location.search().league_id;
            $scope.match.team1={
                members: [],
                otherGoals: 0
            };
            $scope.match.teamB={
                members: [],
                otherGoals: 0
            };
        }

        $scope.save = function() {
            if ( !$scope.match._id ) {
                $scope.match._id = $scope.match.league + '_' + $scope.match.round;
            }

            $scope.match.$save(function() {
                $location.path("/league/detail/"+ $scope.match.league + '/' + $scope.match.round);
            });
        };

        $scope.random = function() {
            var notUsedInTeam = $filter('notUsedInTeam');
            var playersToUse = notUsedInTeam($scope.match.players,$scope.match);
            if ( playersToUse.length === 0 ) {
                for ( var i=0; i<5; i++ ) {
                    $scope.removeTeam1($scope.match.team1.members[0],0);
                }
                for ( var i=0; i<5; i++ ) {
                    $scope.removeTeamB($scope.match.teamB.members[0],0);
                }
            }
            var playersToUse = notUsedInTeam($scope.match.players,$scope.match);
            var length = playersToUse.length;
            //Si estan todos pongo un arquero para cada lado.
            if ( length === 10) {
                var ar1 = util.Arrays.indexOf(playersToUse, function(it) {
                    return $scope.playersMap[it].goalkeeper?0:-1;
                });
                if ( ar1 !== -1 ) {
                    $scope.addTeam1(playersToUse[ar1]);
                    playersToUse.splice(ar1,1);
                }
                ar1 = util.Arrays.indexOf(playersToUse, function(it) {
                    return $scope.playersMap[it].goalkeeper?0:-1;
                });
                if ( ar1 !== -1 ) {
                    $scope.addTeamB(playersToUse[ar1]);
                    playersToUse.splice(ar1,1);
                }
            }
            length = playersToUse.length;
            for ( var i=0; i<length; i++ ) {
                var idx = Math.floor(Math.random()*+playersToUse.length);
                var p = playersToUse[idx];
                playersToUse.splice(idx,1);
                if ( $scope.match.team1.members.length<5 ) {
                    $scope.addTeam1(p);
                } else {
                    $scope.addTeamB(p);
                }
            }
        };
        
        $scope.removeMatch = function() {
            $scope.match.$delete(function() {
                $location.path("/league/detail/"+ $scope.match.league);
            });
        };

        $scope.back = function() {
            if ( $scope.match._id ) {
                $location.path("/league/detail/"+ $scope.match.league + '/' + $scope.match.round);
            } else {
                $location.path("/league/detail/"+ $scope.match.league);
            }

        };

        $scope.addPlayer = function(player) {
            $scope.match.players.push(player);
        };

        $scope.addStarting = function() {
            angular.forEach($scope.players, function(player) {
                if ( player.starting
                        && $scope.match.players.length<10
                        && $scope.match.players.indexOf(player._id) == -1 ) {
                    $scope.addPlayer(player._id);
                }
            });
        };

        function addTeam (team, player) {
            team.members.push({
                player: player,
                goals: 0
            });
        }

        $scope.addTeamB = function(player) {
            addTeam($scope.match.teamB, player);
        };

        $scope.addTeam1 = function(player) {
            addTeam($scope.match.team1, player);
        };

        $scope.addTeamMagic = function(player) {
            if ( $scope.match.team1.members.length<5 ) {
                $scope.addTeam1(player);
            } else {
                $scope.addTeamB(player);
            }
        };

        $scope.remove = function(player) {
            util.Arrays.remove($scope.match.players,player);
        };

        function removeTeam(team, $index) {
            team.members.splice($index,1);
        }

        $scope.removeTeamB = function(player, $index) {
            removeTeam($scope.match.teamB, $index);
        };

        $scope.removeTeam1 = function(player,$index) {
            removeTeam($scope.match.team1, $index);
        };

        function updateGoal(team) {
            team.goals = team.otherGoals||0;
            angular.forEach(team.members, function(member) {
                team.goals+=member.goals||0;
            });
            if ( $scope.match.team1.goals != null && $scope.match.teamB.goals != null  ) {
                if ( $scope.match.team1.goals > $scope.match.teamB.goals ) {
                    $scope.match.winner = '1';
                } else if ( $scope.match.team1.goals < $scope.match.teamB.goals ) {
                    $scope.match.winner = 'B';
                } else {
                    $scope.match.winner = 'E';
                }
            } else {
                $scope.match.winner = null;
            }

        }

        $scope.updateGoalB = function() {
            updateGoal($scope.match.teamB);
        };

        $scope.updateGoal1 = function() {
            updateGoal($scope.match.team1);
        };

        function updateBeer(team) {
            var sum = 0;
            angular.forEach(team.members, function(member) {
                sum += member.beers||0;
            });
            team.avg = sum/5;
            team.beers = sum;
        }

        $scope.updateBeer1 = function() {
            updateBeer($scope.match.team1);
        };

        $scope.updateBeerB = function() {
            updateBeer($scope.match.teamB);
        };

        $scope.updatePodium = function() {
            $scope.match.podium = [null,null,null];
            var ev = function(member) {
                if ( member.podium ) {
                    $scope.match.podium[member.podium-1] = member.player;
                }
            };

            angular.forEach($scope.match.team1.members, ev);
            angular.forEach($scope.match.teamB.members, ev);
        };

        $scope.autoPodium = function() {
            var members = [];

            var add = function(m) {
                members.push(m);
                m.podium = null;
            };

            angular.forEach($scope.match.team1.members, add);
            angular.forEach($scope.match.teamB.members, add);

            var sorted = $filter('orderBy')(members,'beers',true);

            sorted[0].podium = 1;
            sorted[1].podium = 2;
            sorted[2].podium = 3;
            $scope.match.podium = [sorted[0].player,sorted[1].player,sorted[2].player];

        };

        $scope.createNewPlayer = function() {
            PlayerPopup.open().then(function() {
                $scope.playersMap = {};
                $scope.players = Player.query(function() {
                    angular.forEach($scope.players, function(player) {
                        $scope.playersMap[player._id] = player;
                    });
                });
            });
        }

        //Aux for dates
        $scope.opened = {
            date: false
        };

        $scope.openDate = function($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened[type] = true;
        };
    });

    match.directive("matchDetail", function() {
        return {
            restrict : 'EA',
            replace : false,
            templateUrl: 'match/match-detail.html',
            scope : {
                match: '=matchDetail',
                league: '='
            },
            controller: function($scope, Player, $location) {
                $scope.playersMap = {};
                Player.query(function(players) {
                    angular.forEach(players, function(player) {
                        $scope.playersMap[player._id] = player;
                    });
                });
            }
        };
    });

});
