content = require("../apps/content");
module.exports = {
    
    set : function(app){
        app.get("/api/content/take_test/", take_test);
    }
    
}
