/**
 * Created by Rakesh on 2/28/17.
 */
(function () {
    angular
        .module("WebApp")
        .directive("wbdvSortable", wbdvSort);

    function wbdvSort(WidgetService, $routeParams) {

        var pid = $routeParams.pid;

        function linkFunction(scope, element, attributes) {
            var index1, index2;

            element.sortable({
                axis: "y",
                start: function(event, ui) {
                    console.log(ui.item.index())
                    index1 = ui.item.index();
                },
                stop: function(event, ui) {
                    console.log(ui.item.index());
                    index2 = ui.item.index();
                    WidgetService
                        .sortWidgets(pid, index1, index2)
                        .success(function() {
                            console.log("Successfully updated")
                        })

                }
            });

        }

        return {
            link: linkFunction
        };

    }
})();
