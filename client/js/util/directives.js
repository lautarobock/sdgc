define([], function() {

	var directives = angular.module("dl.directives", []);

    directives.filter("Math", function() {
        return function(value, operation, value1, value2, value3) {
            return Math[operation](value, value1, value2, value3);
        };
    });

    directives.directive('secure', function() {
        return function(scope,element) {
            scope.$watch("user", function(value, old) {
                if ( value ) {
                    element.removeClass('hidden');
                } else {
                    element.addClass('hidden');
                }    
            });
        };
    });

    directives.directive('notLogged', function() {
        return function(scope,element) {
            scope.$watch("user", function(value, old) {
                if ( value ) {
                    element.addClass('hidden');
                } else {
                    element.removeClass('hidden');
                }    
            });
        };
    });

    directives.directive('secureAdmin', function() {
        return function(scope,element) {
            scope.$watch("user.isAdmin", function(value, old) {
                if ( value ) {
                    element.removeClass('hidden');
                } else {
                    element.addClass('hidden');
                }    
            });
        };
    });

    directives.directive('logIn', function() {
        return {
            restrict: 'AE',
            replace: true,
            template: '<a not-logged href="javascript:googleLogIn()">{{caption}}</a>',
            link: function(scope, element) {
                scope.caption = element.attr("caption") || "Acceder";
            }
        };
    });

    directives.directive('signIn', function() {
        return {
            restrict: 'AE',
            replace: true,
            template: '<a not-logged href="javascript:googleSignIn()">{{caption}}</a>',
            link: function(scope, element) {
                scope.caption = element.attr("caption") || "Registrarse";   
            }
        };
    });



    directives.directive('mainContent', function() {
        return function(scope, element) {
            scope.$watch("sideBar", function(value) {
                if ( value ) {
                    element.addClass("col-md-9");
                    element.removeClass("col-md-12");
                } else {
                    element.removeClass("col-md-9");
                    element.addClass("col-md-12");
                }
            });
            
        };
    });

    directives.directive('sideBar', function() {
        return function(scope, element) {
            scope.$watch("sideBar", function(value) {
                if ( value ) {
                    element.removeClass("hidden");
                } else {
                    element.addClass("hidden");
                }
            });
            element.addClass("col-md-3");
        };
    });
    
	return directives;
});