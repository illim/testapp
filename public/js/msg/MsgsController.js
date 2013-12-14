'use strict';

define(['jquery', "map"], function($) {

var MsgsCtrl = function($scope, Msg, Usr) {
    $scope.msgs = [];
    $scope.marks = [];

    function addMark(title, pos){
        var markInfo = { title : title, position : pos};
        if ($scope.marks.indexOf(markInfo) == -1){
            console.log("add mark" + markInfo.position);
            $scope.marks.push(markInfo);
        }
    }

    function refreshMsgs(){
        $scope.msgs = Msg.list(Usr.get().location);
    };
    $scope.$on('logged', function(event, user, location) {
        refreshMsgs();
        $scope.$apply();
        addMark(user.name, location)
    });
    $scope.$on('newmsg', function(event) {
        refreshMsgs();
    });

};
MsgsCtrl.$inject = ['$scope', 'msgService', 'userService'];

return MsgsCtrl;

});
