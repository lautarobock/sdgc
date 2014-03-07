define(['../resources'], function() {

	var stats = angular.module("afd.stats", ['afd.resources']);

	stats.directive("statsPlayer", function() {
		return {
			restrict: 'AE',
			scope: {
				league: '=?',
				round: '=?'
			},
			templateUrl: 'stats/stats-player.html',
			controller: function($scope, Stats, Player) {

				$scope.sorts = [{
					name: 'Puntos',
					key: '-points',
					sortBy: ['-points', '-win', '+lost', '-even', '-podium1', '-podium2']
				}, {
					name: 'Goles',
					key: '-goals'
				}, {
					name: 'Promedio gol',
					key: '-goalAvg'
				}, {
					name: 'Birras',
					key: '-beerAvg'
				}, {
					name: 'Figuras',
					key: '-podium1'
				}, {
					name: 'Cebollitas',
					key: '-podium2'
				}, {
					name: '3ª Figura',
					key: '-podium3'
				}, {
					name: 'Total podios',
					key: '-(podium1+podium2+podium3)'
				}];

				$scope.$watch('league+round', function() {
					if ( $scope.league && $scope.round ) {
						$scope.stats = Stats.leagueToRound({
			                league: $scope.league,
			                upToRound: $scope.round
			            });	
					} else {
						$scope.stats = {};
					}
				});
				
				//Load players
				var playersMap = {};
		        $scope.players = Player.query(function() {
		            angular.forEach($scope.players, function(player) {
		                playersMap[player._id] = player;
		            });
		        });

		        $scope.getPlayer = function(player_id) {
		        	return playersMap[player_id];
		        }
			}
		};
	});

});