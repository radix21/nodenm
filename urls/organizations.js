organizations = require("../apps/organizations.js");
module.exports = {
	set : function(app){
		app.get("/organization/create",  create_organization);
		app.get("/organization/:name", see_organization)
	}
}