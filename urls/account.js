account = require("../apps/account");
module.exports = {
    set : function(app, dirname){
        app.get("/account/login", function(req, res){
            res.sendFile(dirname+"/public/templates/login.html");
        });
        app.post("/api/account/login", function(req, res){
            req.session.dataUser = req.body;
            res.send(req.session.dataUser);
        });
        app.get("/api/account/login/", function(req, res){
            console.log(req.session);
            res.send(req.session.dataUser);
        });
    }
}
