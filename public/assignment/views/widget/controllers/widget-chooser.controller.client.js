/**
 * Created by Rakesh on 2/11/17.
 */
(function () {
    angular
        .module("WebApp")
        .controller("widgetChooserController", widgetChooserController);

    function widgetChooserController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.createWidget = createWidget;

        init();

        function init() {
            vm.uid = $routeParams.uid;
            vm.pid = $routeParams.pid;
            vm.wid = $routeParams.wid;

        }

        function createWidget(widgetType) {
            newWidget = {};
            newWidget._id = (new Date()).getTime().toString();
            newWidget.widgetType = widgetType;
            newWidget.pageId = vm.pid;
            switch (widgetType) {
                case "HEADER":
                    newWidget.text = "Default Text";
                    newWidget.size = 3;
                    break;
                case "IMAGE":
                    newWidget.url = "https://i.ytimg.com/vi/fFi4BhD_DUw/maxresdefault.jpg";
                    newWidget.width = "100%";
                    break;
                case "YOUTUBE":
                    newWidget.url = "https://youtu.be/p6WkoK0zJJM";
                    newWidget.width = "100%";
                    break;
                case "HTML":
                    newWidget.text = "<p>Default Text</p>";
                    break;
            }


            WidgetService
                .createWidget(vm.pid, newWidget)
                .success(function() {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + newWidget._id);
                });

        }

    }
})();