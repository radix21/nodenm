xapi = require("../apps/xapi");
module.exports = {
    set : function(app){
        app.get("/api/xapi/statements/", getStatements);
        app.post("/api/xapi/statements/", insertStatement);
    }
}
