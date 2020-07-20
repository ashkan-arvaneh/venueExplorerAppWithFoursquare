# venueExplorerAppWithFoursquare
This is single page application using angularJS to fetch near location venues from Foursquare API

<a href="https://www.ashkanarvaneh.co.uk/technical-tests/venue-explorer/#/explore" target="_blank"> live Demo </a>

Clone the repo using git clone.
In the root directory:
1.npm install
2.bower install
3.grunt server

I used angularjs to build this SPA which makes a JSON call to "https://api.foursquare.com/v2/venues/explore" to fetch venues near a location.
At the beginning the app looks for venues in London, I had to do that since the API requires a location parameter.

I created a service “placesExplorerService” to make a json call and get the data. The response is then passed to my controller using the custom service that I created earlier and dependency injection. Now that I have my data ready I can use Angular filter to filter the information I want.

Once everything is done, I pass my variables to the view “placesresults.html” and using ng-repeat I iterate through the response and build my individual cards.
Then I use myApp.js to watch  the URL, using $routeProvider service and assign my controller and the view to it.

Initially I used the latest angular (1.6.2) but due to security reasons angular is now preventing to  use the JSON_CALLBACK placeholder for specifying the query parameter for the callback, I could use $http and JSONP to overcome that but I could only get data for a single location specified directly in the url. 
