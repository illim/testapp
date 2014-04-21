define(function() {
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
        var form = angular.element("#initForm");
        if (form[0].checkValidity()){
            //btn.prop("disabled", true);
            Usr.set($scope.user.name, $scope.user.location.address, $rootScope);
        } else {
            alert("form not valid");
        }
    };
};
UserCtrl.$inject = ['$scope', '$rootScope', 'userService'];

return UserCtrl;

});
