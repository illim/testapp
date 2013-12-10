'use strict';

require.config({
    paths: {
        'async' : '../vendor/bower/requirejs-plugins/src/async',
        'bootstrap' : '../vendor/bower/bootstrap/dist/js/bootstrap.min',
        'angularStrap' : '../vendor/bower/angular-strap/dist/angular-strap.min'
    },
    shim: {
        'bootstrap': { deps : ['jquery'] },
        'angularStrap': { deps : ['angular', 'bootstrap'] }
    }
});

// !us version
define('angular', ['webjars!angular-locale_en-us.js'], function() { return angular; });
define('ngResource', ['webjars!angular-resource.js']);
define("jquery", [ "webjars!jquery.js" ], function() {  return $; });
define('map', ['async!http://maps.google.com/maps/api/js?sensor=false'], function() { return google.maps ;});

require(['angular'
         , './user/UserController'
         , './msg/MsgController', './directives', './filters'
         , './msg/MsgService', './user/UserService', 'angularStrap'],
        function(angular, userController, msgController) {

            angular.module('myApp', ['myApp.filters', 'myApp.directives', 'myApp.msgService', 'myApp.userService', '$strap.directives']).
                controller('MsgCtrl', msgController).
                controller('UserCtrl', userController).
                config(['$routeProvider', function($routeProvider) {
                    $routeProvider.when('/community', {templateUrl: 'partials/partial2.html'});
                    $routeProvider.when('/about', {templateUrl: 'partials/partial1.html'});
                    $routeProvider.otherwise({redirectTo: '/community'});
                }]).
                config(["$httpProvider", function ($httpProvider) {
				            $httpProvider.interceptors.push(function($q){
                        return {
                            'request': function(config) {
                                angular.element( "#loading" ).show();
                                return config || $q.when(config);
                            },
                            'response': function(response) {
                                angular.element( "#loading" ).hide();
                                return response || $q.when(response);
                            }
                        };
                    });
      		      }]).
                value('version', '0.1');


            angular.bootstrap(document, ['myApp']);

        });
