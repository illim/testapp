define(function() {
'use strict';

var MsgsCtrl = function($scope, Msg, Usr) {
    angular.extend($scope, {
        msgs : [],
        marks : []
    });

    function addMark(title, pos){
        var markInfo = { title : title, position : pos};
        if ($scope.marks.indexOf(markInfo) == -1){
            console.log("add mark" + markInfo.position);
            $scope.marks.push(markInfo);
        }
    }

    $scope.$on('logged', function(event, user, location) {
        Msg.wsStart(location, function(msg){
            if (msg instanceof Array){
                console.log("push msgs" + msg);
                Array.prototype.push.apply($scope.msgs, msg);
            } else {
                console.log("push msg" + msg);
                $scope.msgs.push(msg);
            }
            $scope.$apply();
        });
        addMark(user.name, location);
    });

};
MsgsCtrl.$inject = ['$scope', 'msgService', 'userService'];

return MsgsCtrl;

});
