'use strict';
define(["map"], function($) {

var UserCtrl = function($scope, $rootScope, Usr) {
    $scope.user = Usr.get();
    var mapOptions = { zoom: 12  }; //  center: new google.maps.LatLng(48.833, 2.33),
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var btn = angular.element("#findBtn");
    $scope.$on('logged', function(event, user, location) {
        $scope.user = user;
        btn.prop("disabled", false);
        angular.element("#initForm").hide();
        angular.element("#resume").show();
        map.setCenter(location);
        var marker = new google.maps.Marker({map: map, position: location });
    });

    $scope.find = function(){
        btn.prop("disabled", true);
        Usr.set($scope.user.name, $scope.user.location.address, $rootScope);
    };
};
UserCtrl.$inject = ['$scope', '$rootScope', 'userService'];

return UserCtrl;

});
