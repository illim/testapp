define(['angular', 'ngResource'], function(angular) {
    'use strict';
    var service = angular.module('myApp.msgService', ['ngResource']);
    service.factory('msgService', ['$resource', function($resource){
        var ws ;

        var base = {
            wsStart : function (loc, onMsg) {
                console.log("start");
                if (! ws){
                    var url = "ws://localhost:8080/wscon/"+loc.lng()+"/"+loc.lat();
                    console.log("connect to " + url);
                    ws = new WebSocket(url);
                    ws.onopen = function(){ console.log("Socket has been opened!"); };
                    ws.onmessage = function(message) {
                        var msg = JSON.parse(message.data);
                        console.log("received " + msg);
                        onMsg(msg);
                    };
                }
            },
            wsSubmit : function(msg){
                ws.send(JSON.stringify(msg));
            }
        }
        return angular.extend($resource('msg', {}, {
                submitMsg : {method:'PUT'},
                list:{method:'POST', isArray:true}
            }), base);
    }]);


});
