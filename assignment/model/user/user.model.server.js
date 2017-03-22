/**
 * Created by Rakesh on 3/19/17.
 */
var mongoose = require("mongoose");
var q = require("q");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);


userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

module.exports = userModel;


function createUser(user) {
    var deffered = q.defer();
    userModel
        .create(user, function(err, user) {
            if(err) {
                deffered.abort(err);
            }
            else{
                deffered.resolve(user);
            }
        });
    return deffered.promise;
}

function findUserByCredentials(queryUsername, queryPassword) {
    var deffered = q.defer();
    userModel
        .find({username: queryUsername, password: queryPassword}, function(err, user) {
            if (err) {
                deffered.abort(err);
            }
            else {
                deffered.resolve(user);
            }
        });
    return deffered.promise;
}


function findUserByUsername(queryUsername) {
    var deffered = q.defer();
    userModel
        .find({username: queryUsername}, function(err, user) {
            if (err) {
                deffered.abort(err);
            }
            else {
                deffered.resolve(user);
            }
        });
    return deffered.promise;
}

function findUserById(uid) {
    var deffered = q.defer();
    userModel
        .findById(uid, function(err, user) {
           if(err) {
               deffered.abort(err);
           }
           else {
               deffered.resolve(user);
           }
        });
    return deffered.promise;
}

function updateUser(uid, updatedUser) {
    var deffered = q.defer();
    userModel
        .update({_id:uid},
                {$set: {username:updatedUser.username, firstName:updatedUser.firstName,
                        lastName:updatedUser.lastName, email:updatedUser.email}}, function(err, user) {
                    if (err) {
                        deffered.abort(err);
                    }
                    else {
                        console.log(user);
                        deffered.resolve(user);
                    }
                });
    return deffered.promise;
}


function deleteUser(uid) {
    var deffered = q.defer();
    userModel
        .findByIdAndRemove({_id:uid}, function(err, user) {
            if(err) {
                deffered.abort();
            }
            else {
                user
                    .remove()
                    .then(function () {
                        deffered.resolve();
                    });

            }
        });
    return deffered.promise;
}

