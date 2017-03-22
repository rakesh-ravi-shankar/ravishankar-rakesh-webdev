/**
 * Created by Rakesh on 3/21/17.
 */
var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
    _website: {type:mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
    name: String,
    title: String,
    description: String,
    widgets: [{type:mongoose.Schema.Types.ObjectId, ref:"WidgetModel"}],
    dateCreated: Date
}, {collection: "page.collection"});



pageSchema.post("remove", function (page) {
    var websiteModel = require("../website/website.model.server");
    var widgetModel = require("../widget/widget.model.server");

    websiteModel
        .findWebsiteById(page._website)
        .then(function(website) {
            var page_index = website.pages.indexOf(page._id);
            website.pages.splice(page_index, 1);
            website.save();
        });

    widgetModel.remove({_id: {$in: page.widgets}}).exec();
});

module.exports = pageSchema;