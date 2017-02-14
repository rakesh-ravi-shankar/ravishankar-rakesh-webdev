/**
 * Created by Rakesh on 2/11/17.
 */
(function(){
    angular
        .module("WebApp")
        .controller("widgetListController", widgetListController);

    function widgetListController(WidgetService, $routeParams, $sce){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.pid = $routeParams.pid;
        vm.wid = $routeParams.wid;
        vm.allWidgets = WidgetService.findWidgetsByPageId(vm.pid);
        vm.getEmbededUrl = getEmbededUrl;
        vm.getTrustedHTML = getTrustedHTML;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;


        function getEmbededUrl(widgetUrl){
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getTrustedHTML(htmlText){
            return $sce.trustAsHtml(htmlText);
        }

        function getWidgetTemplateUrl(type){
            var url = 'views/widget/templates/widget-' + type + '.view.client.html';
            return url;
        }
    }
})();