'use strict';

define(['jquery', "map"], function($) {

var MsgCtrl = function($scope, $rootScope, Msg, Usr) {
    var msg = {
        title : "besoin perceuse",
        body : "réparation"
    };
    $scope.msg = msg;
    $scope.send = function(){
        Msg.submitMsg({
            user : Usr.get(),
            msg : msg
        }, function(){
            $rootScope.$broadcast('newmsg');
        });
    };

};
MsgCtrl.$inject = ['$scope', '$rootScope', 'msgService', 'userService'];

return MsgCtrl;

});
