define("app", [
    "locale/locale",
    "menu/menu",
    "resources",
    "gplus",
    "player/player",
    "league/league",
    "match/match",
    "side/side",
    "main/main",
    "util/directives"
    ], function(locale, menu, resources, gplus, beer, rating) {

    var app = angular.module("app", [
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'pascalprecht.translate',
        'highcharts-ng',
        'dl.menu',
        'afd.resources',
        'dl.gplus',
        'afd.player',
        'afd.match',
        'afd.league',
        'afd.side',
        'afd.main',
        'gt.listview',
        'gt.util',
        'gt.form',
        'dl.directives']);

    //Esto esta aca porque este .js se carga en forma asincronica
    angular.element(document).ready(function() {
        // setTimeout(function() {
            angular.bootstrap(document, ['app']);    
        // },3000);
    });

    app.run(
        ['$rootScope','$translate','MainTitle','$log',
            function(
                    $rootScope,
                    $translate,
                    MainTitle,
                    $log) {

        $rootScope.$log = $log;

        MainTitle.set($translate('menu.title.desktop'));

        $rootScope.mainTitle = function() {
            return MainTitle.get();
        };

        $rootScope.sideBar = true;

        $rootScope.toggleSideBar = function() {
            $rootScope.sideBar = !$rootScope.sideBar;
        };

    }]);

    app.run(
        ['$rootScope','Login','evaluateAuthResult','User', '$log',
            function(
                    $rootScope, 
                    Login, 
                    evaluateAuthResult,
                    User,
                    $log) {

        $rootScope.loginSuccess = false;

        $rootScope.$on('g+login', function(event, authResult) {

            evaluateAuthResult(authResult, function(err, googleUser) {
                if ( err ) {
                    $rootScope.loginError = err.message;
                    $rootScope.$apply();
                    $log.error("ERROR", "Login Error", err.message);
                } else if ( googleUser ) {
                    $rootScope.googleUser = googleUser;
                    Login.get({
                            google_id:googleUser.id, 
                            name:googleUser.name, 
                            email: googleUser.email
                        }, function(user) {
                            $rootScope.user = User.get({_id: user._id}, function(user) {
                                $rootScope.loginSuccess = true;
                            });
                    });
                } else {
                    $log.info("ERROR", "Silent Login Error");
                }
            });
        });
        
    }]);



    app.config(['$logProvider',function($logProvider) {
        $logProvider.debugEnabled(false);
    }]);
 
    app.config(['$translateProvider','$routeProvider', function ($translateProvider, $routeProvider) {

        //Configure Translate
        $translateProvider.translations('es', locale.es);
        $translateProvider.preferredLanguage('es');

        var base = ['player','match'];

        //Configure Routes
        $routeProvider.            
                // when('/main', {templateUrl: 'main/main.html',   controller: 'MainController'}).
                
                when('/stats/insert', {templateUrl: 'stats/stats-insert.html',   controller: 'StatsInsertController'}).
                when('/stats/player', {templateUrl: 'stats/stats.html',   controller: 'StatsController'}).
                when('/stats/pair', {templateUrl: 'stats/stats-pair.html',   controller: 'StatsController'}).
                when('/stats/duel', {templateUrl: 'stats/stats-duel.html',   controller: 'StatsController'}).

                when('/league/detail/:league_id', {templateUrl: 'league/league.html',   controller: 'LeagueController'}).
                when('/league/detail/:league_id/:match_round', {templateUrl: 'league/league.html',   controller: 'LeagueController'}).
                when('/league/edit/:league_id', {templateUrl: 'league/league-edit.html',   controller: 'LeagueEditController'}).
                when('/league/new', {templateUrl: 'league/league-edit.html',   controller: 'LeagueEditController'}).
                when('/league', {templateUrl: 'league/league.html',   controller: 'LeagueController'}).
                otherwise({redirectTo: '/league'});
        angular.forEach(base, function(route) {
            var upperBase = route[0].toUpperCase() + route.substr(1);
            $routeProvider.when('/'+route+'/detail/:'+route+'_id', {templateUrl: ''+route+'/'+route+'-detail.html',   controller: upperBase + 'DetailController'});
            $routeProvider.when('/'+route+'/edit/:'+route+'_id', {templateUrl: ''+route+'/'+route+'-edit.html',   controller: upperBase + 'EditController'});
            $routeProvider.when('/'+route+'/new', {templateUrl: ''+route+'/'+route+'-edit.html',   controller: upperBase + 'EditController'});
            $routeProvider.when('/'+route+'', {templateUrl: ''+route+'/'+route+'.html',   controller: upperBase + 'Controller'});
        });
                

                

    }]);


    app.factory('loading', function($rootScope) {
        var services = 0;
        return {
            inc: function(count) {
                services += count||1;
                $rootScope.$broadcast('loading', services);
            },
            dec: function(count) {
                services -= count||1;
                $rootScope.$broadcast('loading', services);
            }
        };
    })

    app.directive("loading", function() {
        return {
            transclude: true,
            template: '<div class="dl-loading" ng-show="loading" ><span ng-transclude></span> ({{loading}})</div>',
            link: function(scope) {
                scope.loading = null;
                scope.$on("loading", function(e, value) {
                    scope.loading = value;
                });
            }
        };
    });

    app.factory('httpInterceptor', function($q,loading,$injector) {
        var _http = null;
        var _requestEnded = function() {
            _http = _http || $injector.get('$http');
            loading.dec();
        };
        return {
            request: function(config) {
                loading.inc();
                return config;
            },

            response: function(response) {
                _requestEnded();
                return response;
            },

            responseError: function(reason) {
                _requestEnded();
                return $q.reject(reason);
            }
        }
    });

    app.config(['$httpProvider',function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');    
    }]);
    
});