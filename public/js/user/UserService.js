define(['angular', 'ngResource'], function(angular) {
    'use strict';
    var service = angular.module('myApp.userService', []);
    service.factory('userService', [function(){
        var user = {
            name : "Minh",
            location : {
                address : "",
                lng : 48.833,
                lat : 2.33
            }
        };

        var geocoder = new google.maps.Geocoder();

        return {
            get : function(){ return user; },
            set : function(name, address, $rootScope){
                geocoder.geocode( { 'address': address }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var location = results[0].geometry.location;
                        user.name = name;
                        user.location.address = address;
                        user.location.lat = location.lat();
                        user.location.lng = location.lng();
                        $rootScope.$broadcast('logged', user, location);
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });
            }
        };
    }]);


});
