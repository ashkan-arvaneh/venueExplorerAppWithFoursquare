var requestParms = {
    clientId: "AHI100G0OL3133L5U0HMHQ1P0LZMOGDZYDE2UQBFB2J2DYC5",
    clientSecret: "UZJ3R2RSYKZ4DOUWSJJM0PKL3XYJRPOFCZL1OS5LMSG4JLVQ",
    version: "20131230"
}
 
app.factory('placesExplorerService', function ($resource,$http) {
 
    var requestUri = 'https://api.foursquare.com/v2/venues/:action';
 
    return $resource(requestUri,
    {
        action: 'explore',
        client_id: requestParms.clientId,
        client_secret: requestParms.clientSecret,
        v: requestParms.version,
        venuePhotos: '1',
        callback: 'JSON_CALLBACK'
    })
    });
    $http.jsonp(requestUri)
    .success(function(data){
        console.log(data.found);
    });
 
