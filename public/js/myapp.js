define(['angular',
         './user/UserController',
         './msg/MsgController', './msg/MsgsController', './directives', './filters',
         './msg/MsgService', './user/UserService', './geo/GeoService', 'angularStrap'],
        function(angular, userController, msgController, msgsController) {
            'use strict';

            angular.module('myApp', ['myApp.filters', 'myApp.directives', 'myApp.msgService', 'myApp.userService', '$strap.directives']).
                controller('UserCtrl', userController).
                controller('MsgCtrl', msgController).
                controller('MsgsCtrl', msgsController).
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
