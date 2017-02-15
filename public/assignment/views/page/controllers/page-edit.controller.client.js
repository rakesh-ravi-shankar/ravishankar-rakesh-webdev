/**
 * Created by Rakesh on 2/11/17.
 */
(function () {
    angular
        .module("WebApp")
        .controller("pageEditController", pageEditController);


    function pageEditController(PageService, $routeParams, $location) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        init();

        function init() {
            vm.uid = $routeParams.uid;
            vm.wid = $routeParams.wid;
            vm.pid = $routeParams.pid;
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
            vm.currentPage = PageService.findPageById(vm.pid);

        }

        function updatePage() {
            PageService.updatePage(vm.pid, vm.currentPage);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }

        function deletePage() {
            PageService.deletePage(vm.pid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }
    }
})();