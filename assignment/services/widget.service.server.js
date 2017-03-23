/**
 * Created by Rakesh on 2/27/17.
 */
module.exports = function(app) {
    var multer = require('multer');
    var storage = multer.diskStorage({
       destination: function (req, file, cb) {
           cb(null, __dirname + "/../../public/uploads")
       },
        filename: function (req, file, cb) {
           var extArray = file.mimetype.split("/");
           var extension = extArray[extArray.length - 1];
           cb(null, "widget_image_" + Date.now() + "." + extension)
        }
    });
    var upload = multer({"storage": storage});

    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.post("/api/page/:pid/widget", createWidget);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.put("/page/:pid/widget", sortWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    var widgetModel = require("../model/widget/widget.model.server");

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pid;
        widgetModel
            .findAllWidgetsForPage(pid)
            .then(function(widgets) {
                res.json(widgets);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        widgetModel
            .findWidgetById(wgid)
            .then(function(widget) {
                res.json(widget);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        var pid = req.params.pid;
        widgetModel
            .createWidget(pid, newWidget)
            .then(function(createdWidget) {
                res.json(createdWidget);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWidget(req, res) {
        var wgid = req.params.wgid;
        var newWidget = req.body;
        widgetModel
            .updateWidget(wgid, newWidget)
            .then(function() {
                res.sendStatus(200);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        widgetModel
            .deleteWidget(wgid)
            .then(function() {
                res.sendStatus(200);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function sortWidget(req, res) {
        var pid = req.params.pid;
        var index1 = parseInt(req.query.initial);
        var index2 = parseInt(req.query.final);

        widgetModel
            .sortWidget(index1, index2, pid)
            .then(function() {
                res.sendStatus(200);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function uploadImage(req, res) {
        var pid = req.body.pid;
        var wgid = req.body.wgid;
        var width = req.body.width;
        var uid = req.body.uid;
        var wid = req.body.wid;

        if(req.file){
            var myFile = req.file;
            var destination = myFile.destination;

            widgetModel
                .findWidgetById(wgid)
                .then(function(widget) {
                    widget.width = width;
                    widget.url = req.protocol + '://' +req.get('host') + "/uploads/" + myFile.filename;
                    pid = widget._page;
                    widget.save();
                    res.redirect("/assignment/#/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/"+ wgid);
                }, function(err) {
                    res.sendStatus(500).send(err);
                });
        }


    }
};