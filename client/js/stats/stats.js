define(['../resources'], function() {

	var stats = angular.module("afd.stats", ['afd.resources']);

	stats.controller('StatsPairController', function($scope, Stats, Player){

		$scope.$watchCollection("selectedLeagues", function() {
			if ( $scope.selectedLeagues ) {
				$scope.stats = Stats.leagueToRoundForPair({
	                leagues: $scope.selectedLeagues
	            });	
			} else {
				$scope.stats = {};
			}
		});

		$scope.countMin = 10;
		$scope.filterPlayer = "_";

		$scope.globalFilter = function(a) {
			return a.count >= $scope.countMin 
				&& ($scope.filterPlayer == "_" || $scope.filterPlayer == a.players[0] || $scope.filterPlayer == a.players[1]);
		};


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


		$scope.sorts = [{
				name: '+Partidos ganados',
				key: ['-win','count']
			}, {
				name: '-Partidos ganados',
				key: ['win','-count']
			}, {
				name: '+Partidos jugados',
				key: ['-count','-(win/count)', '-win']
			}, {
				name: '-Partidos jugados',
				key: ['count','(win/count)', 'win']
			}, {
				name: '+Promedio ganados',
				key: ['-(win/count)','-count']
			}, {
				name: '-Promedio ganados',
				key: ['(win/count)','count']
			// }, {
			// 	name: '+Partidos perdidos',
			// 	key: ['-lost','count']
			// }, {
			// 	name: '-Partidos perdidos',
			// 	key: ['lost','-count']
			}
		];
		

	});

	stats.controller('StatsController',function($scope, League) {

		$scope.filter = {
			league: {}
		};

		$scope.selectedLeagues = [];

		$scope.$watch("filter.league", function(league) {
			$scope.selectedLeagues = [];
			angular.forEach(league, function(value, key) {
				if (value) {
					$scope.selectedLeagues.push(key);
				}
			});
		},true);

		$scope.leagues = League.query(function(leagues) {
			angular.forEach(leagues, function(league) {
				$scope.filter.league[league._id] = true;
			});
		});

		$scope.config= {
			text:{
				title:'Estadisticas'
			},
			show: {
				title: false,
				extra: true
			}
		};
	});

	stats.directive("statsPlayer", function() {
		return {
			restrict: 'AE',
			scope: {
				league: '=?',
				round: '=?',
				leagues: '=?',
				config: '=?'
			},
			templateUrl: 'stats/stats-player.html',
			controller: function($scope, Stats, Player, $interpolate) {

				//override defaults
				$scope.config = $scope.config || {};
				$scope._config = {
					show: {
						match: true,
						goals: true,
						beers: true,
						title: true,
						extra: false
					},
					text: {

					}
				};
				angular.extend($scope._config.show, $scope.config.show);
				angular.extend($scope._config.text, $scope.config.text);
				
				$scope.getTitle = function() {
					if ( $scope._config.text.title ) {
						return $scope._config.text.title;
					} else {
						return $interpolate("Liga {{league}} - Posiciones a la fecha #{{round}}")($scope);	
					}
				};

				$scope.sorts = [{
					name: 'Puntos',
					key: '-points',
					sortBy: ['-points', '-win', '-count', '+lost', '-even', '-podium1', '-podium2']
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
				}, {
					name: 'Partidos jugados',
					key: '-count'
				}, {
					name: 'Partidos ganados',
					key: '-win'
				}, {
					name: 'Partidos perdidos',
					key: '-lost'
				}];

				if ( $scope._config.show.extra ) {
					$scope.sorts.push({
						name: '% Ganados',
						key: '-(win/count)'
					});
				}

				if ( $scope.league && $scope.round ) {
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
				}

				if ( $scope.leagues ) {
					$scope.$watchCollection('leagues', function() {
						if ( $scope.leagues ) {
							$scope.stats = Stats.leagueToRound({
				                leagues: $scope.leagues
				            });	
						} else {
							$scope.stats = {};
						}
					});	
				}
				
				
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