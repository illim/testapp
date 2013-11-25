/*global define */
'use strict';
define(['jquery', "map"], function($) {

var controllers = {};

controllers.ComCtrl = function($scope, Msg) {
    var msg = {
        name : "testname",
        location : {
            address : "massy",
            lng : 48.833,
            lat : 2.33
        },
        title : "truc",
        body : "ouaiihh"
    };
    $scope.msg = msg;
    var mapOptions = { zoom: 12  }; //  center: new google.maps.LatLng(48.833, 2.33),
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var geocoder = new google.maps.Geocoder();
    $scope.find = function(){
        var btn = $("#findBtn");
        btn.prop("disabled", true);
        geocoder.geocode( { 'address': msg.location.address }, function(results, status) {
            btn.prop("disabled", false);
            $("#initForm").hide();
            $("#resume").show();
            $("#msgForm").show();
            if (status == google.maps.GeocoderStatus.OK) {
                var location = results[0].geometry.location;
                msg.location.lat = location.lat();
                msg.location.lng = location.lng();
                map.setCenter(location);
                var marker = new google.maps.Marker({map: map, position: location });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    $scope.send = function(){
        Msg.submitMsg($scope.msg);
    };
};
controllers.ComCtrl.$inject = ['$scope', 'msg'];

return controllers;

});
