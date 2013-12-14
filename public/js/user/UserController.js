define(["map"], function($) {
'use strict';
var UserCtrl = function($scope, $rootScope, Usr) {
    $scope.user = Usr.get();
    var btn = angular.element("#findBtn");
    $scope.$on('logged', function(event, user, location) {
        $scope.user = user;
        btn.prop("disabled", false);
        angular.element("#initForm").hide();
        angular.element("#resume").show();
    });

    $scope.find = function(){
        btn.prop("disabled", true);
        Usr.set($scope.user.name, $scope.user.location.address, $rootScope);
    };
};
UserCtrl.$inject = ['$scope', '$rootScope', 'userService'];

return UserCtrl;

});
