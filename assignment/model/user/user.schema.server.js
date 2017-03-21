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

module.exports = userSchema;