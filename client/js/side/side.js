define(['../resources'], function() {

    var side = angular.module("afd.side", []);

    side.controller("SideController", function($scope, League) {

        $scope.leagues = [];

        League.query(function(leagues) {
            // angular.forEach(leagues, function(league) {

            //     $scope.filter.league[league._id] = true;
            // });
            $scope.leagues = [leagues[leagues.length-1]._id];
            $scope.config.text.title = "Posiciones " + leagues[leagues.length-1].name;
            $scope.configGoals.text.title = "Goleadores " + leagues[leagues.length-1].name;
        });

        $scope.config= {
            text: {
                title:'Posiciones'
            },
            show: {
                title: true,
                goals: false,
                beers: false,
                extra: false,
                header: false,
                rowGroup: false
            }
        };

        $scope.configGoals= {
            text: {
                title:'Goleadores'
            },
            show: {
                title: true,
                match: false,
                goals: true,
                beers: false,
                extra: false,
                header: false,
                rowGroup: false
            },
            sort: {
                init: {
                    name: 'Goles',
                    key: '-goals'
                }
            }
        };

    });

});