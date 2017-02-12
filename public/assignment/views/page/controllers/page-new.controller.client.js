/**
 * Created by Rakesh on 2/11/17.
 */
(function(){
    angular
        .module("WebApp")
        .controller("pageNewController", pageNewController);


    function pageNewController(PageService, $routeParams, $location){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pages = PageService.findPageByWebsiteId(vm.wid);
        vm.createNewPage = createNewPage;


        function createNewPage(newPage){
            PageService.createPage(vm.wid, newPage);
            console.log("created page");
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }
    }
})();