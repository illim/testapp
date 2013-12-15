define(function() {
'use strict';
var MsgCtrl = function($scope, $rootScope, Msg, Usr) {
    angular.extend($scope, {
        msg : {
            title : "besoin perceuse",
            body : "réparation"
        },
        send :  function(){
            Msg.submitMsg({
                user : Usr.get(),
                msg : this.msg
            }, function(){
                $rootScope.$broadcast('newmsg');
            });
        }
    });

};
MsgCtrl.$inject = ['$scope', '$rootScope', 'msgService', 'userService'];

return MsgCtrl;

});
