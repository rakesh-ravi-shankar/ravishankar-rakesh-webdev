/**
 * Created by Rakesh on 2/10/17.
 */
(function () {
    angular
        .module("WebApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController(WebsiteService, $routeParams, $location) {
        var vm = this;
        init();

        function init() {
            vm.uid = $routeParams.uid;
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.uid);
            vm.createWebsite = createWebsite;
        }

        function createWebsite(website) {
            WebsiteService.createWebsite(vm.uid, website);
            $location.url("/user/" + vm.uid + "/website")
        }
    }
})();