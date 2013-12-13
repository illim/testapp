define(['angular', 'ngResource', '../geo/GeoService'], function(angular) {
    'use strict';
    var service = angular.module('myApp.userService', ['myApp.geoService']);
    service.factory('userService', ['geoService', function(geoService){
        console.log("build userservice");
        var user = {
            name : "Minh",
            location : {
                address : "",
                lng : 48.833,
                lat : 2.33
            }
        };

        return {
            get : function(){ return user; },
            set : function(name, address, $rootScope){
                geoService.locate(address, function(location) {
                    user.name = name;
                    user.location.address = address;
                    user.location.lat = location.lat();
                    user.location.lng = location.lng();
                    $rootScope.$broadcast('logged', user, location);
                });
            }
        };
    }]);


});
