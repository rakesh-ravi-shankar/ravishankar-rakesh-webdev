/**
 * Created by Rakesh on 3/20/17.
 */
var mongoose = require("mongoose");

var websiteSchema = mongoose.Schema({
    _user: {type:mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    name: String,
    description: String,
    pages: [{type:mongoose.Schema.Types.ObjectId, ref:"PageModel"}],
    dateCreated: Date
}, {collection: "website.collection"});


websiteSchema.post("remove", function(website) {
    var userModel = require("../user/user.model.server");
    var pageModel = require("../page/page.model.server");
    var widgetModel = require("../widget/widget.model.server");

    userModel
        .findUserById(website._user)
        .then(function(user) {
            var website_index = user.websites.indexOf(wid);
            user.websites.splice(website_index, 1);
            user.save();
        });


    widgetModel.remove({_page: {$in: website.pages}}).exec();
    pageModel.remove({_id: {$in: website.pages}}).exec();
});


module.exports = websiteSchema;