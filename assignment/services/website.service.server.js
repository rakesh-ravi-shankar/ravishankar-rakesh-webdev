module.exports = function(app) {
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.post("/api/user/:uid/website", createWebsite);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);


    var websiteModel = require("../model/website/website.model.server");


    function findAllWebsitesForUser(req, res) {
        var uid = req.params.uid;
        websiteModel
            .findAllWebsitesForUser(uid)
            .then(function(websites) {
                res.json(websites);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;
        websiteModel
            .findWebsiteById(wid)
            .then(function(website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createWebsite(req, res) {
        var website = req.body;
        var uid = req.params.uid;
        websiteModel
            .createWebsite(uid, website)
            .then(function() {
                res.sendStatus(200);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWebsite(req, res) {
        var newWebsite = req.body;
        var wid = req.params.wid;
        websiteModel
            .updateWebsite(wid, newWebsite)
            .then(function(website){
                res.sendStatus(200);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteWebsite(req, res) {
        var wid = req.params.wid;
        websiteModel
            .deleteWebsite(wid)
            .then(function() {
                res.sendStatus(200);
            }, function(err) {
                res.sendStatus(500).send(err);
            });


    }


};