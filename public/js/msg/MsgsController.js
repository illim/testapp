'use strict';

define(['jquery', "map"], function($) {

var MsgsCtrl = function($scope, Msg, Usr) {
    $scope.msgs = [];
    function refreshMsgs(){
        $scope.msgs = Msg.list(Usr.get().location);
    };
    $scope.$on('logged', function(event, user, location) {
        refreshMsgs();
        $scope.$apply();
    });
    $scope.$on('newmsg', function(event) {
        refreshMsgs();
    });

};
MsgsCtrl.$inject = ['$scope', 'msgService', 'userService'];

return MsgsCtrl;

});
