define([],function() {

    var res = angular.module("afd.resources", ['ngResource']);

    var path = "api/"
    
    res.factory("Login", function($resource) {
        return $resource("/api/login/by_google/:google_id", {}, {});
    });

    var services = ['User', 'Player', 'League', 'Match'];
    angular.forEach(services,function(s) {
        res.factory(s,function($resource, $rootScope) {
            var params = function() {
                return $rootScope.user ? $rootScope.user.google_id : null;
            };
            return $resource( "/" + path + s + '/:operation:_id',{_id:"@_id",google_id:params}, {
                count: {method:'GET', params: {operation:'count'}, isArray:false}
            });
        });
    });

    res.filter("afdLeagueStatus", function() {
        return function(status) {
            if ( consts.League.Status[status] ) {
                return consts.League.Status[status].name;
            } else {
                return status;    
            }
        }
    });

    res.filter("afdMatchStatus", function() {
        return function(status) {
            if ( consts.Match.Status[status] ) {
                return consts.Match.Status[status].name;
            } else {
                return status;    
            }
        }
    });

    return res;
});