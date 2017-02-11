/**
 * Created by Rakesh on 2/10/17.
 */
(function(){
    angular
        .module("WebApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        init();
        vm.createWebsite = createWebsite;

        function init(){
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.uid);
        }
        function createWebsite(website){
            WebsiteService.createWebsite(vm.uid, website);
            $location.url("/user/" + vm.uid + "/website")
        }
    }
})();