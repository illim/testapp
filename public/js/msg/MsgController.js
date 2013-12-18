define(function() {
'use strict';
var MsgCtrl = function($scope, $rootScope, Msg, Usr) {
    angular.extend($scope, {
        msg : {
            title : "besoin perceuse",
            body : "réparation"
        },
        send :  function(){
            Msg.wsSubmit({
                user : Usr.get(),
                msg : this.msg
            });
        }
    });

};
MsgCtrl.$inject = ['$scope', '$rootScope', 'msgService', 'userService'];

return MsgCtrl;

});
