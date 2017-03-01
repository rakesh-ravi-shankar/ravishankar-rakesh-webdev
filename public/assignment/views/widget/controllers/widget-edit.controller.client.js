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
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function(wg) {
                    vm.currentWidget = wg;
                })
        }

        function updateWidget() {
            WidgetService
                .updateWidget(vm.wgid, vm.currentWidget)
                .success(function() {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .success(function() {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }

    }
})();