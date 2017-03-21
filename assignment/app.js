/**
 * Created by Rakesh on 2/27/17.
 */
module.exports = function(app) {
    var userModel = require("./model/user/user.model.server");
    var websiteModel = require("./model/website/website.model.server");
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};