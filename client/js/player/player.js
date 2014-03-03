define(['../resources'], function() {

    var player = angular.module("afd.player", ["afd.resources"]);

    player.controller("PlayerController", function($scope, Player, $translate) {

        $scope.players = Player;

        $scope.headers = [{
                field: 'name',
                caption: $translate('player.name'),
                template:   '<a href="#/player/detail/{{$model._id}}">' +
                                '<b>{{$model.lastName}}, {{$model.name}}</b>' +
                            '</a>'
            }
        ];
    });

});