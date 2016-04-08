account = require("../apps/account");
module.exports = {
    set : function(app, dirname, http){
        app.get("/api/xapi/statements/", getStatements);//TODO
        app.post("/api/xapi/statements/", insertStatement); //TODO
    }
}
