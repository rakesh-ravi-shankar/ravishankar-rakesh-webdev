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


    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "The Verge"},
        {"_id": "123", "widgetType": "HEADER", "pageId": "432", "size": 2, "text": "The Verge"},
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

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pid;
        var widgetsForGivenPage = [];
        for (var index in widgets) {
            if (widgets[index].pageId === pid) {
                widgetsForGivenPage.push(widgets[index]);
            }
        }
        res.json(widgetsForGivenPage);
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        var widget = widgets.find(function(wg) {
            return wg._id == wgid;
        });
        res.json(widget);
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        widgets.push(newWidget);
        res.sendStatus(200);
    }

    function updateWidget(req, res) {
        var wgid = req.params.wgid;
        var newWidget = req.body;
        for (var index in widgets) {
            if (widgets[index]._id === wgid) {
                if (newWidget.widgetType === "HEADER") {
                    widgets[index].name = newWidget.name;
                    widgets[index].text = newWidget.text;
                    widgets[index].size = newWidget.size;
                }
                else if ((newWidget.widgetType === "IMAGE") || (newWidget.widgetType === "YOUTUBE")) {
                    widgets[index].name = newWidget.name;
                    widgets[index].text = newWidget.text;
                    widgets[index].url = newWidget.url;
                    widgets[index].width = newWidget.width;
                }
                else if (newWidget.widgetType === "HTML") {
                    widgets[index].name = newWidget.name;
                    widgets[index].text = newWidget.text;
                }
                res.sendStatus(200);
                return;
            }
        }
    }

    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        for (var index in widgets) {
            if (widgets[index]._id === wgid) {
                widgets.splice(index, 1);
                res.sendStatus(200);
                return;
            }
        }
    }

    function sortWidget(req, res) {
        var pid = req.params.pid;
        var index1 = parseInt(req.query.initial);
        var index2 = parseInt(req.query.final);

        var widgetsForGivenPage = [];
        for (var index in widgets) {
            if (widgets[index].pageId === pid) {
                widgetsForGivenPage.push(index);
            }
        }

       for (var i = index1; i < index2; i++) {
            var temp = widgets[widgetsForGivenPage[i]];
            widgets[widgetsForGivenPage[i]] = widgets[widgetsForGivenPage[i+1]];
            widgets[widgetsForGivenPage[i+1]] = temp;
        }

        for (var i = index1; i > index2; i--) {
            var temp = widgets[widgetsForGivenPage[i]];
            widgets[widgetsForGivenPage[i]] = widgets[widgetsForGivenPage[i-1]];
            widgets[widgetsForGivenPage[i-1]] = temp;
        }

        res.sendStatus(200);
    }

    function uploadImage(req, res) {
        var pid = req.body.pid;
        var wgid = req.body.wgid;
        var width = req.body.width;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var myFile = req.file;
        var destination = myFile.destination;

        for (var i in widgets) {
            if (widgets[i]._id === wgid) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' +req.get('host') + "/uploads/" + myFile.filename;
                pid = widgets[i].pageId;
                console.log(widgets[i]);
                break;
            }
        }

        res.redirect("/assignment/#/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/"+ wgid);
    }
};