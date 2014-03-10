define([], function() {

    var comment = angular.module("afd.comment", []);

    comment.directive("comment", function() {
        return {
            restrict: 'AE',
            templateUrl: 'comment/comment.html',
            scope: {
                owner: '=' //Resource to has comments.
            }, 
            controller: function($scope, $rootScope) {
                $rootScope.$watch("user.name", function(name) {
                    $scope.name = name;
                });
                
                $scope.addComment = function(commentText) {
                    var comment = {
                        text: commentText,
                        user: $rootScope.user ? $rootScope.user._id : null,
                        date: new Date(),
                        name: $scope.name
                    };
                    $scope.owner.comments.push(comment);
                    $scope.owner.$save(function() {
                        $scope.commentText = '';
                    });
                }
            }
        };
    });

});