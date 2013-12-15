define(['angular', 'ngResource'], function(angular) {
    'use strict';
    var service = angular.module('myApp.msgService', ['ngResource']);
    service.factory('msgService', ['$resource', function($resource){
        return $resource('msg', {}, {
            submitMsg : {method:'PUT'},
            list:{method:'POST', isArray:true}
        });
    }]);


});
