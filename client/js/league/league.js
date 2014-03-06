define(['../resources'], function() {

	var league = angular.module("afd.league", ["afd.resources"]);

	league.controller("LeagueController", function($scope, League, Match, $location,$routeParams,Stats,Player) {

        $scope.playersMap = {};
        $scope.players = Player.query(function() {
            angular.forEach($scope.players, function(player) {
                $scope.playersMap[player._id] = player;
            });
        });

		$scope.leagues = League.query(onLoad);
		$scope.league = null;
		$scope.matches = [];
		$scope.match = null;
		$scope.nextRound = 1;
        $scope.nextDate = new Date().getTime();
        $scope.stats = {};

		function onLoad() {
            if ( $scope.leagues.length != 0 ) {
                if ( $routeParams.league_id ) {
                    angular.forEach($scope.leagues, function(league) {
                        if ( league._id == $routeParams.league_id ) {
                            $scope.loadLeague(league,true);
                        }
                    });
                } else {
                    $scope.loadLeague($scope.leagues[$scope.leagues.length-1]);    
                }
            } else {
                $scope.clearLeague();
            }
		}

        $scope.clearLeague = function() {
            $scope.league = null;
            $scope.clearMatch();
            $scope.nextRound = 1;
            $scope.nextDate = new Date().getTime();
        };

		$scope.loadLeague = function(league, auto) {
			$scope.league = league;
            $scope.nextRound = 1;
            $scope.nextDate = new Date().getTime();
			$scope.matches = Match.query({
                    filter:{league: league._id},
                    sort: 'round'
                }, function() {
				angular.forEach($scope.matches, function(match) {
					$scope.nextRound = match.round + 1;
                    $scope.nextDate = new Date(match.date).getTime();
				})
                if ( $scope.matches.length != 0) {
                    if ( auto && $routeParams.league_id == $scope.league._id && $routeParams.match_round ) {
                        angular.forEach($scope.matches, function(match) {
                            if ( match.round == $routeParams.match_round ) {
                                $scope.loadMatch(match);
                            }
                        }); 
                    } else {
                        $scope.loadMatch($scope.matches[$scope.matches.length-1]);        
                    }
                } else {
                    $scope.clearMatch();
                }
                $scope.nextDate+=1000*60*60*24*7;
			});
            
		}

        $scope.clearMatch = function() {
            $scope.match = null;
            $scope.stats = {};
        }

        $scope.loadMatch = function(match) {
            $scope.match = match;
            $scope.stats = Stats.leagueToRound({
                league: $scope.league._id,
                upToRound: match.round
            });
        };

	});

	league.controller("LeagueEditController", function($scope, League, $routeParams) {

		if ( $routeParams.league_id ) {
			$scope.league = League.get({_id: $routeParams.league_id});
		} else {
            $scope.league = new League();
        }

		//Aux for dates
		$scope.opened = {
            startDate: false,
            finishDate: false
        };
        
        $scope.openDate = function($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened[type] = true;
        };

        $scope.save = function() {

            $scope.league.$save(function() {
                window.history.back();
            });

        };
	});

});