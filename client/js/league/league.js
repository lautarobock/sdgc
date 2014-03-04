define(['../resources'], function() {

	var league = angular.module("afd.league", ["afd.resources"]);

	league.controller("LeagueController", function($scope, League) {

		$scope.leagues = League.query(onLoad);

		function onLoad() {	
			$scope.league = null;
			$scope.leagueIdx = -1;
			var i = 0;
			angular.forEach($scope.leagues, function(it) {
				if ( it.status == consts.League.Status.RUNNING ) {
					if ( !$scope.league ) {
						$scope.league = it;
						$scope.leagueIdx = i;
					} else {
						$scope.error = 'Tiene mas de una liga comenzadas, por favor deje una sola';
					}
				} 
				i++;
			});



		}

	});

	league.controller("LeagueEditController", function($scope) {

	});

});