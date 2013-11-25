/*global define, angular */

'use strict';

require.config({
    paths: {
        async: 'lib/require/async',
    }
});

// Declare here that angular is the US version - other locales can be easily substituted.

define('angular', ['webjars!angular-locale_en-us.js'], function() {  return angular; });
define('ngResource', ['webjars!angular-resource.js']);
define("jquery", [ "webjars!jquery.js" ], function() { return $; });

define('map', ['async!http://maps.google.com/maps/api/js?sensor=false'], function() { return google.maps ;});

require(['angular', './controllers', './directives', './filters', './services'],
        function(angular, controllers) {

            // Declare app level module which depends on filters, and services

            angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
                config(['$routeProvider', function($routeProvider) {
                    $routeProvider.when('/community', {templateUrl: 'partials/partial2.html', controller: controllers.ComCtrl});
                    $routeProvider.otherwise({redirectTo: '/community'});
                }]);

            angular.bootstrap(document, ['myApp']);

        });
