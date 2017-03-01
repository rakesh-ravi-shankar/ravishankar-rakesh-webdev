module.exports = function(app) {
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.post("/api/user/:uid/website", createWebsite);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];


    function findAllWebsitesForUser(req, res) {
        var uid = req.params.uid;
        var sites = [];
        for (var index in websites) {
            if (websites[index].developerId === uid) {
                sites.push(websites[index]);
            }
        }
        res.json(sites);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;
        var website = websites.find(function(w) {
            return w._id === wid;
        });
        res.json(website);
    }

    function createWebsite(req, res) {
        var website = req.body;
        websites.push(website);
        res.sendStatus(200);
    }

    function updateWebsite(req, res) {
        var newWebsite = req.body;
        var wid = req.params.wid;

        for (var index in websites) {
            if (websites[index]._id === wid) {
                websites[index].name = newWebsite.name;
                websites[index].description = newWebsite.description;
                res.sendStatus(200);
                return;
            }
        }
    }

    function deleteWebsite(req, res) {
        var wid = req.params.wid;
        for (var index in websites) {
            if (websites[index]._id === wid) {
                websites.splice(index, 1);
                res.sendStatus(200);
                return;
            }
        }


    }


};