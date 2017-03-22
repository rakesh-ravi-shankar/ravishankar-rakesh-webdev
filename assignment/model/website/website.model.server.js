/**
 * Created by Rakesh on 3/20/17.
 */
var mongoose = require("mongoose");
var q = require("q");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);

websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.createWebsite = createWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;


var userModel = require("../user/user.model.server");


function findAllWebsitesForUser(uid) {
    var deffered = q.defer();
    websiteModel
        .find({_user:uid}, function(err, websites) {
            if (err) {
                deffered.reject();
            }
            else {
                deffered.resolve(websites);
            }
        });
    return deffered.promise;
}

function findWebsiteById(wid) {
    var deffered = q.defer();
    websiteModel
        .findById(wid, function(err, website) {
            if(err){
                deffered.reject(err);
            }
            else {
                deffered.resolve(website);
            }
        });
    return deffered.promise;
}


function createWebsite(uid, website) {
    var deffered = q.defer();
    websiteModel
        .create({name:website.name, description:website.description, _user:uid}, function(err, createdWebsite) {
            if (err) {
                deffered.reject(err);
            }
            else {
                userModel
                    .findUserById(uid)
                    .then(function(user) {
                        user.websites.push(createdWebsite._id);
                        user.save();
                    });
                deffered.resolve();
            }
        });
    return deffered.promise;
}


function updateWebsite(wid, newWebsite) {
    var deffered = q.defer();
    websiteModel
        .update({_id:wid},
                {$set:{name:newWebsite.name, description:newWebsite.description}},
                function(err, website) {
                    if(err) {
                        deffered.reject(err);
                    }
                    else {
                        deffered.resolve(website);
                    }
                });
    return deffered.promise;
}


function deleteWebsite(wid) {
    var deffered = q.defer();

    websiteModel
        .findByIdAndRemove({_id:wid}, function(err, website) {
            if(err) {
                deffered.reject(err);
            }
            else {
                website
                    .remove()
                    .then(function() {
                        deffered.resolve();
                    });
            }
        });


    return deffered.promise;
}

