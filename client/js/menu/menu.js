define([], function() {

    var menu = angular.module("dl.menu", [ ]);

    menu.run(['$rootScope','$location',
        function($rootScope,$location) {
    }]);

    menu.directive("mainMenu", function() {
        return {
            restrict: "EA",
            replace: true,
            templateUrl: 'menu/menu.html',
            controller: function($scope) {
                
                $scope.isCollapsed = true;
                
                $scope.toogleMenu = function() {
                    $scope.isCollapsed = !$scope.isCollapsed;            
                }

            }
        };
    });

    return menu;
});