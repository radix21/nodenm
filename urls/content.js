content = require("../apps/content");
module.exports = {
    
    set : function(app){
        app.get("/api/content/take_test/", take_test);
        app.get("/api/content/json_fetch_exam", fetch_exam);
        app.get("/api/content/json_fetch_user_slide", fetch_user_slide);
        app.get("/api/content/json_finish_exam", finish_exam);
    }
    
}
