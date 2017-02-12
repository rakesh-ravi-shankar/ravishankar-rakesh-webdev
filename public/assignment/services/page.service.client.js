/**
 * Created by Rakesh on 2/11/17.
 */
(function(){
    angular
        .module("WebApp")
        .factory("PageService", PageService);


    function PageService(){
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "createPage" : createPage,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };

        return api;

        function findPageByWebsiteId(wid){
            var pageList = [];
            for(var index in pages){
               if(pages[index].websiteId == wid){
                   pageList.push(pages[index]);
               }
            }
            return pageList;
        }

        function findPageById(pid){
            for(var index in pages){
                if(pages[index]._id == pid){
                    return angular.copy(pages[index]);
                }
            }
            return null;
        }

        function createPage(wid, page){
            page._id = (new Date()).getTime();
            page.websiteId = wid;
            pages.push(page);
        }

        function updatePage(pid, newPage){
            for(var index in pages){
                if(pages[index]._id == pid){
                    pages[index].name = newPage.name;
                    pages[index].description = newPage.description;
                    return;
                }
            }
        }

        function deletePage(pid){
            for(var index in pages){
                if(pages[index]._id == pid){
                    pages.splice(index, 1);
                    return;
                }
            }


        }
    }
})();