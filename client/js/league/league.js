define(['../resources'], function() {

	var league = angular.module("afd.league", ["afd.resources"]);

	league.controller("LeagueController", function($scope, League, Match) {

		$scope.leagues = League.query(onLoad);
		$scope.league = null;
		$scope.matches = [];
		$scope.match = null;
		$scope.nextRound = 1;

		function onLoad() {	
            if ( $scope.leagues.length != 0 ) {
                $scope.loadLeague($scope.leagues[$scope.leagues.length-1]);    
            } else {
                $scope.clearLeague();
            }
		}

        $scope.clearLeague = function() {
            $scope.league = null;
            $scope.clearMatch();
            $scope.nextRound = 1;
        };

		$scope.loadLeague = function(league) {
			$scope.league = league;
            $scope.nextRound = 1;
			$scope.matches = Match.query({
                    filter:{league: league._id},
                    sort: 'round'
                }, function() {
				angular.forEach($scope.matches, function(match) {
					$scope.nextRound = match.round + 1;
				})
                if ( $scope.matches.length != 0) {
                    $scope.loadMatch($scope.matches[$scope.matches.length-1]);    
                } else {
                    $scope.clearMatch();
                }
			});

		}

        $scope.clearMatch = function() {
            $scope.match = null;
            $scope.nextRound = 1;
        }

        $scope.loadMatch = function(match) {
            $scope.match = match;
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