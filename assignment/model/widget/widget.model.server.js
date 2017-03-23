/**
 * Created by Rakesh on 3/21/17.
 */
var mongoose = require("mongoose");
var q = require("q");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);

widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.createWidget = createWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.sortWidget = sortWidget;

module.exports = widgetModel;


var pageModel = require("../page/page.model.server");

function findAllWidgetsForPage(pid) {
    var deffered = q.defer();

    pageModel
        .findById(pid, function(err, page) {
            console.log(page.widgets);
            widgetModel
                .find({_id: {$in: page.widgets}}, function(err, widgets) {
                    if(err) {
                        deffered.reject(err);
                    }
                    else {

                        widgets.sort(function (a, b) {
                            return page.widgets.indexOf(a._id) - page.widgets.indexOf(b._id);
                        });

                        console.log(widgets);
                        deffered.resolve(widgets);
                    }
                });
        });

    return deffered.promise;
}


function findWidgetById(wgid) {
    var deffered = q.defer();
    widgetModel
        .findById(wgid, function(err, widget) {
            if(err) {
                deffered.reject(err);
            }
            else{
                deffered.resolve(widget);
            }
        });
    return deffered.promise;
}


function createWidget(pid, newWidget) {
    var deffered = q.defer();
    newWidget._page = pid;
    widgetModel
        .create(newWidget, function(err, createdWidget) {
            if (err) {
                deffered.reject(err);
            }
            else {
                pageModel
                    .findPageById(pid)
                    .then(function(page) {
                        page.widgets.push(createdWidget._id);
                        page.save();
                    });
                deffered.resolve(createdWidget);
            }
        });
    return deffered.promise;
}


function updateWidget(wgid, newWidget) {
    var deffered = q.defer();
    widgetModel
        .update({_id:wgid}, newWidget, function(err, updatedWidget) {
                if(err) {
                    deffered.reject(err);
                }
                else{
                    deffered.resolve(updatedWidget);
                }
        });
    return deffered.promise;
}


function deleteWidget(wgid) {
    var deffered = q.defer();
    var pid;

    findWidgetById(wgid)
        .then(function(widget) {
            pid = widget._page;

            widgetModel
                .remove({_id:wgid}, function(err) {
                    if(err) {
                        deffered.reject(err);
                    }
                    else {
                        pageModel
                            .findPageById(pid)
                            .then(function(page) {

                                var page_index = page.widgets.indexOf(wgid);
                                page.widgets.splice(page_index, 1);
                                page.save();
                                deffered.resolve();
                            });

                    }
                })
        });

    return deffered.promise;
}


function sortWidget(index1, index2, pid) {
    var deffered = q.defer();


            pageModel
                .findPageById(pid)
                .then(function (page) {

                    for (var i = index1; i < index2; i++) {
                        var temp = page.widgets[i];
                        page.widgets[i] = page.widgets[i + 1];
                        page.widgets[i + 1] = temp;
                    }

                    for (var i = index1; i > index2; i--) {
                        var temp = page.widgets[i];
                        page.widgets[i] = page.widgets[i - 1];
                        page.widgets[i - 1] = temp;
                    }

                    pageModel
                        .update({_id: pid}, {$set: {widgets: page.widgets}}, function(err, updatedPage) {
                            pageModel
                                .findPageById(pid)
                                .then(function (page) {
                                });
                            deffered.resolve();
                        });


                });


    return deffered.promise;
}


