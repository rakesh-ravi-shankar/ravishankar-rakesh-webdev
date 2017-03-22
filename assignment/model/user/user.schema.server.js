/**
 * Created by Rakesh on 3/19/17.
 */
var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type:mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}],
    dateCreated: Date
}, {collection: "user.collection"});


userSchema.post("remove", function(user) {
    var websiteModel = require("../website/website.model.server");

    websiteModel.remove({_id: {$in: user.websites}}).exec();
});

module.exports = userSchema;