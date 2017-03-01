/**
 * Created by Rakesh on 2/11/17.
 */
(function () {
    angular
        .module("WebApp")
        .factory("PageService", PageService);


    function PageService($http) {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "createPage": createPage,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function findPageByWebsiteId(wid) {
            return $http.get("/api/website/" + wid + "/page");
        }

        function findPageById(pid) {
            return $http.get("/api/page/" + pid);
        }

        function createPage(wid, page) {
            page._id = (new Date()).getTime().toString();
            page.websiteId = wid;
            return $http.post("/api/website/" + wid + "/page", page);
        }

        function updatePage(pid, newPage) {
            return $http.put("/api/page/" + pid, newPage);
        }

        function deletePage(pid) {
            return $http.delete("/api/page/" + pid);
        }
    }
})();