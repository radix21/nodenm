main = require("./apps/main");
account = require("./urls/account")
app = main.getServer();
settings = require("./apps/settings.js");
settings.use(app);
app.set('view engine', 'ejs');
account.set(app, public_html);
app.set('port', (process.env.PORT || 5000));

app.get("/", function(req, res){
    res.render("pages/index", {status:"logged"});
})


server.listen(app.get("port"), function(){
    console.log('Node app is running on port', app.get('port'));
});
