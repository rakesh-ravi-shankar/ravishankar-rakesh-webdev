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
widgetModel.uploadImage = uploadImage;

module.exports = widgetModel;


var pageModel = require("../page/page.model.server");

function findAllWidgetsForPage(pid) {
    var deffered = q.defer();
    pageModel
        .find({_page:pid}, function(err, widgets) {
                if(err) {
                    deffered.reject(err);
                }
                else {
                    deffered.resolve(widgets);
                }
        });
    return deffered.promise;
}


function findWidgetById(wgid) {
    var deffered = q.defer();
    pageModel
        .findById(wgid, function(err, widget) {
            if(err) {
                resolve.reject(err);
            }
            else{
                resolve.resolve(widget);
            }
        });
    return deffered.promise;
}


function createWidget(pid, newWidget) {
    var deffered = q.defer();
    newWidget._page = pid;
    pageModel
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
                deffered.resolve();
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
                            });
                        //delete pages here
                        deffered.resolve();
                    }
                })
        });

    return deffered.promise;
}


function sortWidget() {

}


function uploadImage() {

}
