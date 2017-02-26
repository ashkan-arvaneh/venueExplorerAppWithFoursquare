var app = angular.module('recommendationApp', ['ngRoute', 'ngResource', 'ngSanitize']);
app.config(function ($routeProvider,$sceDelegateProvider) {
 	
	$sceDelegateProvider.resourceUrlWhitelist([
	    // Allow same origin resource loads.
	    'self',
	    // Allow loading from our assets domain.  Notice the difference between * and **.
	    'https://api.foursquare.com/v2/venues/**'
  	]);

    $routeProvider.when("/explore", {
        controller: "recommendationAppController",
        templateUrl: "/views/placesresults.html"
    });
    $routeProvider.otherwise({ redirectTo: "/explore" });
 
});