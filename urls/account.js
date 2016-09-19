account = require("../apps/account");
module.exports = {
    set : function(app, dirname){
        app.get("/account/login/", loginView);
        app.post("/api/account/login", login);
        app.get("/api/account/logout/", logout);
        app.post("/api/account/register/", register);
        app.post("/api/account/is_authenticated", isAuthenticated);
        app.get("/api/account/exists/:username", user_exists);
        app.get("/api/account/getmutoken/", getMUToken);
        app.post("/api/account/uploadavatar/", uploadAvatar);
        app.post("/api/account/resetpasswd/", resetPasswd);
        app.post("/api/account/restartpasswd/", restartPasswd);
        app.get("/account/recover/", recover);
        app.get("/account/reset/:uid/:key/", restart);
    }
}
