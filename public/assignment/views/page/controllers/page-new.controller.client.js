/**
 * Created by Rakesh on 2/11/17.
 */
(function () {
    angular
        .module("WebApp")
        .controller("pageNewController", pageNewController);


    function pageNewController(PageService, $routeParams, $location) {
        var vm = this;
        vm.createNewPage = createNewPage;

        init();

        function init() {
            vm.uid = $routeParams.uid;
            vm.wid = $routeParams.wid;
            vm.pages = PageService.findPageByWebsiteId(vm.wid);

        }

        function createNewPage(newPage) {
            PageService.createPage(vm.wid, newPage);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }
    }
})();