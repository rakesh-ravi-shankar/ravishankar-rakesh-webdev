/**
 * Created by Rakesh on 3/19/17.
 */
(function() {
    angular
        .module("WebApp")
        .service("FlickrService", FlickrService);


    function FlickrService($http) {
        var key = "27706c05d2878ddc78314c8852f40534";
        var secret = "823e971e0386ec64";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        this.searchPhotos = searchPhotos;

        function searchPhotos(searchTerm) {

            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();