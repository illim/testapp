define(['angular'], function(angular) {
'use strict';
angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('geomap', [function() {
      return {
          restrict: 'E',
          scope: {
              marks: '=',
              center : '='
          },
          template: '<div id="map-canvas" style="width: 100%; height: 200px" ></div>',
          link: function (scope, element, attrs) {
              console.log("link");
              var mapOptions = { zoom: 12  }; //  center: new google.maps.LatLng(48.833, 2.33),
              var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
/**              function getLocation() {
                  if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(showPosition);
                  } else {
                      console.log("Geolocation is not supported by this browser.");
                  }
              }*/

              var markeds = [];
              var inited = false;

              scope.$watchCollection("marks",function(newCol){
                  if (! inited && newCol.length > 0){
                      map.setCenter(newCol[0].position);
                      inited = true;
                  }
                  newCol.forEach(function(m){
                      var idx = markeds.indexOf(m);
                      if (idx == -1){
                          markeds.push(m);
                          new google.maps.Marker({map: map, position: m.position, title:m.title  });
                      }
                  });
                  if (newCol.length != markeds.length){
                      // TODO clean markeds
                  }
              });

              scope.$watch("center", function(center){
                  if (!! center && !! center.position){
                      map.setCenter(center.position);
                  }
              });
          }
      };
  }]);

});
