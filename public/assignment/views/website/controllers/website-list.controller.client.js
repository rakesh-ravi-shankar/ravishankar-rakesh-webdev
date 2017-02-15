/**
 * Created by Rakesh on 2/10/17.
 */
(function () {
    angular
        .module("WebApp")
        .controller("websiteListController", websiteListController);

    function websiteListController(WebsiteService, $routeParams) {
        var vm = this;
        init();

        function init() {
            vm.uid = $routeParams.uid;
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.uid);
        }
    }
})();