/**
 * Created by Rakesh on 3/21/17.
 */
var mongoose = require("mongoose");
var q = require("q");
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);

pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.createPage = createPage;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;


var websiteModel = require("../website/website.model.server");


function findAllPagesForWebsite(wid) {
    var deffered = q.defer();
    pageModel
        .find({_website:wid}, function(err, pages) {
            if (err) {
                deffered.reject();
            }
            else {
                deffered.resolve(pages);
            }
        });
    return deffered.promise;
}

function findPageById(pid) {
    var deffered = q.defer();
    pageModel
        .findById(pid, function(err, page) {
            if(err){
                deffered.reject(err);
            }
            else {
                deffered.resolve(page);
            }
        });
    return deffered.promise;
}


function createPage(wid, page) {
    var deffered = q.defer();
    pageModel
        .create({name:page.name, description:page.description, _website:wid}, function(err, createdPage) {
            if (err) {
                deffered.reject(err);
            }
            else {
                websiteModel
                    .findWebsiteById(wid)
                    .then(function(website) {
                        website.pages.push(createdPage._id);
                        website.save();
                    });
                deffered.resolve();
            }
        });
    return deffered.promise;
}


function updatePage(pid, newPage) {
    var deffered = q.defer();
    pageModel
        .update({_id:pid},
            {$set:{name:newPage.name, description:newPage.description}},
            function(err, page) {
                if(err) {
                    deffered.reject(err);
                }
                else {
                    deffered.resolve(page);
                }
            });
    return deffered.promise;
}


function deletePage(pid) {
    var deffered = q.defer();
    var wid;

    findPageById(pid)
        .then(function(page) {
            wid = page._website;

            pageModel
                .remove({_id:pid}, function(err) {
                    if(err) {
                        deffered.reject(err);
                    }
                    else {
                        websiteModel
                            .findWebsiteById(wid)
                            .then(function(website) {

                                var page_index = website.pages.indexOf(pid);
                                website.pages.splice(page_index, 1);
                                website.save();
                            });
                        //delete widgets here
                        deffered.resolve();
                    }
                })
        });

    return deffered.promise;
}