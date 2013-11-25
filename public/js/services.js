/*global define */

'use strict';

define(['angular', 'ngResource'], function(angular) {

    var service = angular.module('myApp.services', ['ngResource']).value('version', '0.1');
    service.factory('msg', ['$resource', function($resource){
        return $resource('msg', {}, {
            submitMsg : {method:'POST'}
        });
    }]);


});
