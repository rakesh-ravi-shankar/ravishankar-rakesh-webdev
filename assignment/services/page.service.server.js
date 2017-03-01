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

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.wid;

        var pageList = [];
        for (var index in pages) {
            if (pages[index].websiteId === wid) {
                pageList.push(pages[index]);
            }
        }
        res.json(pageList);
    }

    function findPageById(req, res) {
        var pid = req.params.pid;
        var page = pages.find(function(p) {
            return p._id === pid;
        });
        res.json(page);

    }

    function createPage(req, res) {
        var page = req.body;
        pages.push(page);
        res.sendStatus(200);
    }

    function updatePage(req, res) {
        var pid = req.params.pid;
        var newPage = req.body;
        for (var index in pages) {
            if (pages[index]._id === pid) {
                pages[index].name = newPage.name;
                pages[index].description = newPage.description;
                res.sendStatus(200);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var pid = req.params.pid;
        for (var index in pages) {
            if (pages[index]._id === pid) {
                pages.splice(index, 1);
                res.sendStatus(200);
                return;
            }
        }
    }

};