/**
 * Created by Rakesh on 2/11/17.
 */
(function () {
    angular
        .module("WebApp")
        .controller("pageListController", pageListController);

    function pageListController(PageService, $routeParams) {
        var vm = this;

        init();

        function init() {
            vm.uid = $routeParams.uid;
            vm.wid = $routeParams.wid;
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
        }
    }
})();