/**
 * Created by Rakesh on 2/11/17.
 */
(function(){
    angular
        .module("WebApp")
        .controller("widgetChooserController", widgetChooserController);

    function widgetChooserController(WidgetService, $routeParams, $location){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.pid = $routeParams.pid;
        vm.wid = $routeParams.wid;
        vm.createWidget = createWidget;

        function createWidget(widgetType){
            newWidget = {}
            newWidget._id = (new Date()).getTime();
            newWidget.widgetType = widgetType;
            newWidget.pageId = vm.pid;
            WidgetService.createWidget(vm.pid, newWidget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + newWidget._id);
        }

    }
})();