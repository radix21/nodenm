account = require("../apps/account");
module.exports = {
    set : function(app, dirname){
        app.get("/account/login/", loginView);
        app.post("/api/account/login", login);
        app.get("/api/account/logout/", logout);
        app.post("/api/account/register/", register);
        app.post("/api/account/is_authenticated", isAuthenticated);
        app.get("/api/account/exists/:username", user_exists);

    }
}
