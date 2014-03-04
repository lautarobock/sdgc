define(['../resources'], function() {

	var league = angular.module("afd.league", ["afd.resources"]);

	league.controller("LeagueController", function($scope, League, Match) {

		$scope.leagues = League.query(onLoad);
		$scope.league = null;
		$scope.matches = [];
		$scope.match = null;
		$scope.nextRound = 1;

		function onLoad() {	
			$scope.loadLeague($scope.leagues[$scope.leagues.length-1]);
		}

		$scope.loadLeague = function(league) {
			$scope.league = league;
			$scope.matches = Match.query({filter:{league: league._id}}, function() {
				angular.forEach($scope.matches, function(match) {
					$scope.nextRound = match.round + 1;
				})
			});
		}

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