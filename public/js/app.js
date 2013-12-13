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

// !us version
define('angular', ['webjars!angular-locale_en-us.js'], function() { return angular; });
define('ngResource', ['webjars!angular-resource.js']);
define("jquery", [ "webjars!jquery.js" ], function() {  return $; });
define('map', ['async!http://maps.google.com/maps/api/js?sensor=false&region=FR'], function() { return google.maps ;});
