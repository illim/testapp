'use strict';

define(['jquery', "map"], function($) {

var MsgsCtrl = function($scope, $http,  Msg, Usr) {
    $scope.msgs = [];
    function refreshMsgs(){
        console.log("get msgs");
        $scope.msgs = Msg.list(Usr.get().location, function(data){
            console.log(data);
        });
    };
    $scope.$on('logged', function(event, user, location) {
        refreshMsgs();
    });
    $scope.$on('newmsg', function(event) {
        refreshMsgs();
    });

};
MsgsCtrl.$inject = ['$scope', '$http', 'msgService', 'userService'];

return MsgsCtrl;

});
