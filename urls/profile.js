profile = require("../apps/profile");

module.exports= {
    set: function(app){
        app.get("/profile", profileView);
        app.get("/api/profile/:username", get_profile);//TODO: add urls and app
        app.post("/api/profile/:username", edit_profile);// add url and app
        
    }
}

