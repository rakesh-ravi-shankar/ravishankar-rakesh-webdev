/**
 * Created by Rakesh on 2/11/17.
 */
(function () {
    angular
        .module("WebApp")
        .service("WidgetService", widgetService);

    function widgetService() {
        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "The Verge"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "https://i.ytimg.com/vi/fFi4BhD_DUw/maxresdefault.jpg"
            },
            {
                "_id": "456", "widgetType": "HTML", "pageId": "321",
                "text": "<p>Proin sem eros, feugiat et aliquet quis, luctus non tortor. " +
                "Nullam orci lorem, feugiat quis ante quis, volutpat viverra nisl. " +
                "Sed eu nunc ornare justo tempus gravida. " +
                "Proin ac urna nunc. Vivamus imperdiet luctus dui in commodo. " +
                "Fusce suscipit nulla lectus, sit amet imperdiet risus faucibus nec. " +
                "Maecenas blandit, massa vitae tincidunt efficitur, diam est suscipit felis, at feugiat ligula sapien non ex. " +
                "Quisque rutrum fringilla accumsan. " +
                "Etiam euismod eros a eros rutrum, et sagittis quam euismod. " +
                "Donec maximus interdum sem, quis egestas ex ultricies ut. " +
                "Cras consequat nisl sodales, scelerisque nibh eget, eleifend neque. " +
                "Interdum et malesuada fames ac ante ipsum primis in faucibus. " +
                "Suspendisse odio magna, auctor eu facilisis id, posuere eget mauris.</p>"
            },
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/p6WkoK0zJJM"
            },
            {
                "_id": "789", "widgetType": "HTML", "pageId": "321",
                "text": "<p>Proin sem eros, feugiat et aliquet quis, luctus non tortor. " +
                "Nullam orci lorem, feugiat quis ante quis, volutpat viverra nisl. " +
                "Sed eu nunc ornare justo tempus gravida. " +
                "Proin ac urna nunc. Vivamus imperdiet luctus dui in commodo. " +
                "Fusce suscipit nulla lectus, sit amet imperdiet risus faucibus nec. " +
                "Maecenas blandit, massa vitae tincidunt efficitur, diam est suscipit felis, at feugiat ligula sapien non ex. " +
                "Quisque rutrum fringilla accumsan. " +
                "Etiam euismod eros a eros rutrum, et sagittis quam euismod. " +
                "Donec maximus interdum sem, quis egestas ex ultricies ut. " +
                "Cras consequat nisl sodales, scelerisque nibh eget, eleifend neque. " +
                "Interdum et malesuada fames ac ante ipsum primis in faucibus. " +
                "Suspendisse odio magna, auctor eu facilisis id, posuere eget mauris.</p>"
            }
        ];

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        function findWidgetsByPageId(pid) {
            var widgetsForGivenPage = [];
            for (var index in widgets) {
                if (widgets[index].pageId === pid) {
                    widgetsForGivenPage.push(widgets[index]);
                }
            }
            return widgetsForGivenPage;

        }

        function findWidgetById(wgid) {
            for (var index in widgets) {
                if (widgets[index]._id === wgid) {
                    return angular.copy(widgets[index]);
                }
            }
            return null;
        }

        function createWidget(pid, newWidget) {
            widgets.push(newWidget);
        }

        function updateWidget(wgid, newWidget) {
            for (var index in widgets) {
                if (widgets[index]._id == wgid) {
                    if (newWidget.widgetType === "HEADER") {
                        widgets[index].text = newWidget.text;
                        widgets[index].size = newWidget.size;
                    }
                    else if ((newWidget.widgetType === "IMAGE") || (newWidget.widgetType === "YOUTUBE")) {
                        widgets[index].url = newWidget.url;
                        widgets[index].width = newWidget.width;
                    }
                    else if (newWidget.widgetType === "HTML") {
                        widgets[index].text = newWidget.text;
                    }
                    return;
                }
            }
        }

        function deleteWidget(wgid) {
            console.log(wgid);
            for (var index in widgets) {
                if (widgets[index]._id === wgid) {
                    widgets.splice(index, 1);
                }
            }
        }
    }
})();