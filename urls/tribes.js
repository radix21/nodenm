tribes = require("../apps/tribes");

module.exports = {
    set : function(app){
        app.get("/api/tribes/get_tribe/:id", get_tribe);
        app.get("/api/tribes/get_topic/:id", get_topic);
        app.post("/api/tribes/send_post/:id/:comment/", send_post);
        app.post("/api/tribes/send_post/:id/:comment/:parent/", send_post);
    }
}

