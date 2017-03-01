/**
 * Created by Rakesh on 2/10/17.
 */
(function () {
    angular
        .module("WebApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        init();

        function init() {
            vm.uid = $routeParams.uid;
            vm.wid = $routeParams.wid;

            WebsiteService
                .findAllWebsitesForUser(vm.uid)
                .success(function(websites) {
                    vm.websites = websites;
                });

            WebsiteService
                .findWebsiteById(vm.wid)
                .success(function(website) {
                    vm.website = website;
                });

        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.wid)
                .success(function() {
                    $location.url("/user/" + vm.uid + "/website");
                });

        }

        function updateWebsite() {
            WebsiteService
                .updateWebsite(vm.wid, vm.website)
                .success(function() {
                    $location.url("/user/" + vm.uid + "/website")
                });

        }
    }
})();