/**
 * Created by Rakesh on 2/10/17.
 */
(function () {
    angular
        .module("WebApp")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "findWebsiteById": findWebsiteById,
            "createWebsite": createWebsite,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite
        };

        return api;

        function findAllWebsitesForUser(uid) {
            return $http.get("/api/user/" + uid + "/website");
        }

        function findWebsiteById(wid) {
            return $http.get("/api/website/" + wid);
        }

        function createWebsite(uid, website) {
            website.developerId = uid;
            website._id = (new Date()).getTime().toString();
            return $http.post("/api/user/" + uid + "/website", website);
        }

        function deleteWebsite(wid) {
            return $http.delete("/api/website/" + wid);
        }

        function updateWebsite(wid, newWebsite) {
            return $http.put("/api/website/" + wid, newWebsite);
        }
    }
})();