module.exports = {
    urls : function(app){
        app.get("/account", function(req, res){
            res.send("account");
        })
    }
}
