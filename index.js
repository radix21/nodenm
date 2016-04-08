main = require("./apps/main");
account = require("./urls/account")
xapi = require("./urls/xapi")
app = main.server();
settings = require("./apps/settings.js");
settings.use(app);
ejs = require("ejs");
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
account.set(app, public_html, http);
xapi.set(app);
//app.set('port', (process.env.PORT || 5000));
app.set('port', (4000));
app.use(express.static(__dirname + '/public'));
app.get("/", function(req, res){
    res.render("pages/home", {session : req.session});
})

app.get("/template/:template", function(req, res){
    res.render("pages/"+req.params.template);
});


server.listen(app.get("port"), function(){
    console.log('Node app is running on port', app.get('port'));
});
