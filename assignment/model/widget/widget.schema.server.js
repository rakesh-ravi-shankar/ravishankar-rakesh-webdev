/**
 * Created by Rakesh on 3/21/17.
 */
var mongoose = require("mongoose");

var widgetSchema = mongoose.Schema({
    _page: {type:mongoose.Schema.Types.ObjectId, ref:"PageModel"},
    type: {type:String, enum:['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: Date
}, {collection: "widget.collection"});

module.exports = widgetSchema;