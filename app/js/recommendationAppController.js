'use strict';
app.controller('recommendationAppController', function ($scope,$http, $filter,$resource,$log,$routeParams,$location,placesExplorerService) {

    $scope.exploreNearby = "London";
    $scope.filterValue = "";

    $scope.places = [];
    $scope.filteredPlaces = [];
    $scope.filteredPlacesCount = 0;

    //paging
    $scope.totalRecordsCount = 0;
    $scope.pageSize = 10;
    $scope.currentPage = 1;

    init();

    function init() {

        createWatche();
        getPlaces();
    }

    function getPlaces() {

        var offset = ($scope.pageSize) * ($scope.currentPage - 1);
        placesExplorerService.get({near: $scope.exploreNearby, limit: $scope.pageSize, offset: offset}, function (response) {
        	if (response.response.groups) {
                $scope.places = response.response.groups[0].items;
                $scope.totalRecordsCount = response.response.totalResults;
                filterPlaces('');
                $log.info(response);
            }
            else {
                $scope.places = [];
                $scope.totalRecordsCount = 0;
            }
        });

        /***** This was my solution to the latest angular 1.6.2 which stops the JSON call-back function and based on the foursquare documentation, a location has to be specidifed in the url. With the following code I can only get data for london so my two way data binding wouldn't work.*****/

       /* var url = "https://api.foursquare.com/v2/venues/explore?client_id=AHI100G0OL3133L5U0HMHQ1P0LZMOGDZYDE2UQBFB2J2DYC5&client_secret=UZJ3R2RSYKZ4DOUWSJJM0PKL3XYJRPOFCZL1OS5LMSG4JLVQ&v=20130815&near=london;"
       
        $http.jsonp(url,{near: $scope.exploreNearby, query: $scope.exploreQuery, limit: $scope.pageSize, offset: offset})
                .then (function mySuccess(response) {
                    $scope.response = response;

                    $log.info(response);
                    //$log.info(response.data.response.groups[0].items);
                    if (response.data.response.groups) {
                        $scope.places = response.data.response.groups[0].items;
                        $scope.totalRecordsCount = response.data.response.totalResults;
                        filterPlaces('');
                        $log.info($scope.totalRecordsCount);
                    }
                    else {
                        $scope.places = [];
                        $scope.totalRecordsCount = 0;
                    }
                    $scope.loading = false;
                }, function myError (status) {
                    $log.warn("Something went wrong");
        });*/
    };

    function filterPlaces(filterInput) {
        $scope.filteredPlaces = $filter("placeNameFilter")($scope.places, filterInput);
        $scope.filteredPlacesCount = $scope.filteredPlaces.length;
    }

    function createWatche() {

        $scope.$watch("filterValue", function (filterInput) {
            filterPlaces(filterInput);
        });
    }

    $scope.doSearch = function () {

        $scope.currentPage = 1;
        getPlaces();
    };

    $scope.pageChanged = function (page) {

        $scope.currentPage = page;
        getPlaces();
    };

    $scope.buildCategoryIcon = function (icon) {

        return icon.prefix + '44' + icon.suffix;
    };

    $scope.buildVenueThumbnail = function (photo) {

        return photo.items[0].prefix + '128x128' + photo.items[0].suffix;
    };
});