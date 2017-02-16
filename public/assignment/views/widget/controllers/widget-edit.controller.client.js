/**
 * Created by Rakesh on 2/11/17.
 */
(function () {
    angular
        .module("WebApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        init();

        function init() {
            vm.uid = $routeParams.uid;
            vm.pid = $routeParams.pid;
            vm.wid = $routeParams.wid;
            vm.wgid = $routeParams.wgid;
            vm.dropdownOptions = [1, 2, 3, 4, 5, 6];
            vm.currentWidget = WidgetService.findWidgetById(vm.wgid);
        }

        function updateWidget() {
            WidgetService.updateWidget(vm.wgid, vm.currentWidget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.wgid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }

    }
})();