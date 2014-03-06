define(['../resources'], function() {

    var player = angular.module("afd.player", ["afd.resources"]);

    player.controller("PlayerController", function($scope, Player, $translate) {

        $scope.players = Player;

        $scope.headers = [{
                field: 'name',
                caption: 'Nombre',
                template:   '<a href="#/player/edit/{{$model._id}}">' +
                                '<b>{{$model.name}}</b>' +
                            '</a>'
            },{
                field: 'lastName',
                caption: 'Apellido',
                template:   '<a href="#/player/edit/{{$model._id}}">' +
                                '<b>{{$model.lastName}}</b>' +
                            '</a>'
            },{
                field: 'alias',
                caption: 'Apodo',
                template:   '<a href="#/player/edit/{{$model._id}}">' +
                                '<b>{{$model.alias}}</b>' +
                            '</a>'
            },{
                field: 'starting',
                caption: 'Titular',
                getValue: function(player) {
                    return player.starting ? '<b>Titular</b>' : '';
                },
                template:   '{{header.getValue($model)}}'
            }
        ];
    });

    player.controller('PlayerEditController', function($scope, $routeParams, Player){
        
        if ( $routeParams.player_id ) {
            $scope.player = Player.get({_id: $routeParams.player_id});
        } else {
            $scope.player = new Player();
        }

        $scope.save = function() {
            if ( !$scope.player._id ) {
                $scope.player._id = $scope.player.alias.replace(/[^a-z0-9]/ig, '');
            }
            $scope.player.$save(function() {
                window.history.back();
            });
        }

    });

    player.factory("PlayerPopup", function($modal) {
        var obj = {
            open : function (player) {
                var modalInstance = $modal.open({
                    templateUrl: 'player/player-popup.html',
                    controller: 'PlayerPopupController',
                    resolve: {
                        player: function() {
                            return player;
                        }
                    }
                });

                return modalInstance.result;
            }
        };
        return obj;
    });

    player.controller("PlayerPopupController", function($scope, $modalInstance, player, Player) {

        $scope.player = player;

        if ( !$scope.player ) {
            $scope.player = new Player();
        }

        $scope.ok = function () {
            if ( !$scope.player._id ) {
                $scope.player._id = $scope.player.alias.replace(/[^a-z0-9]/ig, '');
            }
            $scope.player.$save(function() {
                $modalInstance.close();
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });

});