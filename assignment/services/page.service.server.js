/**
 * Created by Rakesh on 2/27/17.
 */
module.exports = function(app) {
    app.get("/api/website/:wid/page",findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.post("/api/website/:wid/page", createPage);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    var pageModel = require("../model/page/page.model.server");


    function findAllPagesForWebsite(req, res) {
        var wid = req.params.wid;
        pageModel
            .findAllPagesForWebsite(wid)
            .then(function(pages) {
                res.json(pages);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPageById(req, res) {
        var pid = req.params.pid;
        pageModel
            .findPageById(pid)
            .then(function(page) {
                res.json(page);
            }, function(err) {
                res.sendStatus(500).send(err)
            });
    }

    function createPage(req, res) {
        var page = req.body;
        var wid = req.params.wid;
        pageModel
            .createPage(wid, page)
            .then(function () {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err)
            });
    }

    function updatePage(req, res) {
        var pid = req.params.pid;
        var newPage = req.body;
        pageModel
            .updatePage(pid, newPage)
            .then(function (page) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err)
            });
    }

    function deletePage(req, res) {
        var pid = req.params.pid;
        pageModel
            .deletePage(pid)
            .then(function() {
                res.sendStatus(200);
            }, function(err) {
                res.sendStatus(500).send(err)
            });
    }

};