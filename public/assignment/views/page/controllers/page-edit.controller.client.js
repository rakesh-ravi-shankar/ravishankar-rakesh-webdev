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
            PageService
                .findPageByWebsiteId(vm.wid)
                .success(function(pages) {
                    vm.pages = pages;
                });
            PageService
                .findPageById(vm.pid)
                .success(function(page) {
                    vm.currentPage = page;
                });


        }

        function updatePage() {
            PageService
                .updatePage(vm.pid, vm.currentPage)
                .success(function() {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                });

        }

        function deletePage() {
            PageService
                .deletePage(vm.pid)
                .success(function() {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                });
        }
    }
})();