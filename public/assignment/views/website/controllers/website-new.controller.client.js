/**
 * Created by Rakesh on 2/10/17.
 */
(function () {
    angular
        .module("WebApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.createWebsite = createWebsite;

        init();

        function init() {
            vm.uid = $routeParams.uid;

            WebsiteService
                .findAllWebsitesForUser(vm.uid)
                .success(function(websites) {
                    vm.websites = websites;
                });
        }

        function createWebsite(website) {
            WebsiteService
                .createWebsite(vm.uid, website)
                .success(function() {
                    $location.url("/user/" + vm.uid + "/website");
                });

        }
    }
})();