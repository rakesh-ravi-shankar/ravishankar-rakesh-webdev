/**
 * Created by Rakesh on 2/10/17.
 */
(function(){
    angular
        .module("WebApp")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService(){

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];
        var api = {
            "findAllWebsitesForUser" : findAllWebsitesForUser,
            "findWebsiteById" : findWebsiteById,
            "createWebsite" : createWebsite,
            "deleteWebsite" : deleteWebsite,
            "updateWebsite" : updateWebsite
        };

        return api;

        function findAllWebsitesForUser(uid){
            var sites = [];
            for(var index in websites){
                if(websites[index].developerId === uid){
                    sites.push(websites[index]);
                }
            }
            return sites;
        }

        function findWebsiteById(wid){
            for(var index in websites){
                if(websites[index]._id === wid){
                    return angular.copy(websites[index]);
                }
            }
            return null;
        }

        function createWebsite(uid, website){
            website.developerId = uid;
            website._id = (new Date()).getTime();
            websites.push(website);
        }

        function deleteWebsite(wid){
            console.log(websites);
            for(var index in websites){
                if(websites[index]._id == wid){
                    websites.splice(index, 1);
                }
            }
        }
        function updateWebsite(wid, newWebsite){
            console.log(websites);
            for(var index in websites){
                if(websites[index]._id == wid){
                    websites[index].name = newWebsite.name;
                    websites[index].description = newWebsite.description;
                }
            }
        }
    }
})();