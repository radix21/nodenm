account = require("../apps/account");
module.exports = {
    set : function(app, dirname, http){
        app.get("/account/login", loginView);
        app.post("/api/account/login", login);
        app.post("/api/account/logout/", logout);
        app.post("/api/account/register/", register);
    }
}
