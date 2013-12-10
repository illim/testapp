'use strict';

define(['jquery', "map"], function($) {

var MsgCtrl = function($scope, Msg) {
    var msg = {
        name : "Minh",
        location : {
            address : "",
            lng : 48.833,
            lat : 2.33
        },
        title : "besoin perceuse",
        body : "réparation"
    };
    $scope.msg = msg;
    $scope.msgs = [];

    $scope.$on('logged', function(event, user, location) {
        $("#msgForm").show();
        getMsgs();
    });
    $scope.send = function(){
        Msg.submitMsg(msg);
        getMsgs();
    };

    function getMsgs(){
        $scope.msgs = Msg.list(msg.location);
    };
};
MsgCtrl.$inject = ['$scope', 'msgService'];

return MsgCtrl;

});
