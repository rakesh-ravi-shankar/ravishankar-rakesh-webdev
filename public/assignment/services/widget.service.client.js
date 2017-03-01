/**
 * Created by Rakesh on 2/11/17.
 */
(function () {
    angular
        .module("WebApp")
        .service("WidgetService", widgetService);

    function widgetService($http) {

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.sortWidgets = sortWidgets;

        function findWidgetsByPageId(pid) {
            return $http.get("/api/page/" + pid + "/widget");
        }

        function findWidgetById(wgid) {
            return $http.get("/api/widget/" + wgid);
        }

        function createWidget(pid, newWidget) {
            return $http.post("/api/page/" + pid + "/widget", newWidget);
        }

        function updateWidget(wgid, newWidget) {
            return $http.put("/api/widget/" + wgid, newWidget);
        }

        function deleteWidget(wgid) {
            return $http.delete("/api/widget/" + wgid);
        }

        function sortWidgets(pid, index1, index2) {
            return $http.put("/page/" + pid + "/widget?initial=" + index1 + "&final=" + index2);
        }
    }
})();