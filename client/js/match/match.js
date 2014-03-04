define(['../resources'], function() {

    var match = angular.module("afd.match", ["afd.resources"]);

    match.controller("MatchEditController", function($scope,$routeParams,Match,$location) {
        
        if ( $routeParams.match_id ) {
            $scope.match = League.get({_id: $routeParams.match_id});
        } else {
            $scope.match = new Match();
            $scope.match.round = parseInt($location.search().nextRound);
            $scope.match.date = new Date();
            $scope.match.league = $location.search().league_id;
        }

        $scope.save = function() {
            if ( !$scope.match._id ) {
                $scope.match._id = $scope.match.league + '_' + $scope.match.round;
            }

            $scope.match.$save(function() {
                window.history.back();
            });
        };

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

});