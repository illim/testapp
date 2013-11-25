/*global define */
'use strict';
define(["map"], function() {

var controllers = {};
var user = {
    location : {}
};

controllers.ComCtrl = function($scope) {
    $scope.address = "";
    var mapOptions = {
//        center: new google.maps.LatLng(48.833, 2.33),
        zoom: 12
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
                                      mapOptions);
    var geocoder = new google.maps.Geocoder();
    $scope.find = function(){
        geocoder.geocode( { 'address': $scope.address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                user.location = results[0].geometry.location;
                map.setCenter(user.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: user.location
                });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };
};
controllers.ComCtrl.$inject = ['$scope'];

return controllers;

});
