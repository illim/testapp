define(['angular', 'ngResource'], function(angular) {
    'use strict';

    var service = angular.module('myApp.geoService', []);
    service.factory('geoService', [function(){

        var geocoder = new google.maps.Geocoder();

        return {
            locate : function(address, callback){
                geocoder.geocode( { 'address': address }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        callback(results[0].geometry.location);
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                })
            }
        };
    }]);


});
