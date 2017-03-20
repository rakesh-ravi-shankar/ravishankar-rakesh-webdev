/**
 * Created by Rakesh on 3/19/17.
 */
var mongoose = require("mongoose");
var q = require("q");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);


function createUser(user) {
    console.log(user);
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


userModel.createUser = createUser;

module.exports = userModel;