define(function() {
'use strict';

var MsgsCtrl = function($scope, Msg, Usr) {
    angular.extend($scope, {
        msgs : [],
        marks : [],
        center : {}
    });

    $scope.centerUser = function(user){
        var mark = findMark(user.location);
        if (!! mark) {
            $scope.center = mark;
        }
    };

    function toLatLng(pos){
        if (pos instanceof google.maps.LatLng){
            return pos;
        } else {
            return new google.maps.LatLng(pos.lat, pos.lng);
        }
    }

    function addMark(title, pos){
        if (! findMark(pos)){
            var markInfo = { title : title, position : toLatLng(pos)};
            console.log("add mark" + markInfo.position);
            $scope.marks.push(markInfo);
        }
    }

    function findMark(loc_){
        var res;
        var loc = toLatLng(loc_);
        for(var i=0; i < $scope.marks.length && ! res; i++){
            var x = $scope.marks[i];
            if (x.position.lat() == loc.lat() && x.position.lng() == loc.lng()){
                res = x
            }
        }
        return res;
    }

    $scope.$on('logged', function(event, user, location) {
        Msg.wsStart(location, function(msg){
            if (msg instanceof Array){
                Array.prototype.push.apply($scope.msgs, msg);
                msg.forEach(function(m){ addMark(m.user.name, m.user.location); });
            } else {
                $scope.msgs.push(msg);
                addMark(msg.user.name, msg.user.location);
            }
            $scope.$apply();
        });
        addMark(user.name, location);
    });

};
MsgsCtrl.$inject = ['$scope', 'msgService', 'userService'];

return MsgsCtrl;

});
