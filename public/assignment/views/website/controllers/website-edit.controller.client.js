/**
 * Created by Rakesh on 2/10/17.
 */
(function(){
    angular
        .module("WebApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        init();
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init(){
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.uid);
            vm.website = WebsiteService.findWebsiteById(vm.wid);
        }
        function deleteWebsite(){
            console.log(vm.wid);
            WebsiteService.deleteWebsite(vm.wid);
            $location.url("/user/" + vm.uid + "/website");
        }
        function updateWebsite(){
            WebsiteService.updateWebsite(vm.wid, vm.website);
            $location.url("/user/" + vm.uid + "/website")
        }
    }
})();