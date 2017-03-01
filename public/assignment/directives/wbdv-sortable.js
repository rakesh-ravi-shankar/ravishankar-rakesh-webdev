/**
 * Created by Rakesh on 2/28/17.
 */
(function () {
    angular
        .module("WebApp")
        .directive("wbdvSortable", wbdvSort);

    function wbdvSort(WidgetService, $routeParams) {



        function linkFunction(scope, element, attributes) {
            var index1, index2;
            var pid = $routeParams.pid;
            console.log("Handling sort in page: " + pid);

            element.sortable({
                axis: "y",
                start: function(event, ui) {
                    index1 = ui.item.index();
                },
                stop: function(event, ui) {
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
