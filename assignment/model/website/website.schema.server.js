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

module.exports = websiteSchema;