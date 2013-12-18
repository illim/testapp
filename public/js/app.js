require.config({
    paths: {
        'async' : '../vendor/bower/requirejs-plugins/src/async',
        'bootstrap' : '../vendor/bower/bootstrap/dist/js/bootstrap.min',
        'angularStrap' : '../vendor/bower/angular-strap/dist/angular-strap.min'
    },
    shim: {
        'bootstrap': { deps : ['jquery'] },
        'angularStrap': { deps : ['angular', 'bootstrap'] }
    }
});

define("jquery", [ "webjars!jquery.js" ], function() {  return $; });
// !us version
define('angular', ['jquery', 'webjars!angular-locale_en-us.js'], function() { return angular; });
define('ngResource', ['webjars!angular-resource.js']);
define('map', ['async!http://maps.google.com/maps/api/js?sensor=false&region=FR'], function() { return google.maps ;});
