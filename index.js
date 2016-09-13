// START SETTINGS
ejs = require("ejs");
fileExists = require("file-exists");
request = require('then-request');
fs = require("fs");
main = require("./apps/main");
app = main.server();
app.set('view engine', 'html');
//app.set('port', 4000);
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.engine('html', ejs.renderFile);
settings = require("./apps/settings.js");
settings.use(app);
// END SETTINGS

// START KMELX APPS

kmelx = require('./urls/kmelx');
certificates = require('./urls/certificates');
account = require("./urls/account");
xapi = require("./urls/xapi");
courses = require("./urls/courses");
organizations = require('./urls/organizations');


tribes = require("./urls/tribes");
content = require("./urls/content");
content.set(app);

account.set(app, public_html, http);
xapi.set(app);
kmelx.set(app);
courses.set(app);
certificates.set(app);
organizations.set(app);

tribes.set(app);

// END KMELX APPS

/**
 * DEFAULT_URL
 **/
app.get("*", function(req, res){
    folder = CLIENTS[req.hostname] != undefined ?  CLIENTS[req.hostname].folder : undefined;
    if(folder == undefined){
        res.status(403).send({
            status : "error",
            error : "403",
            message : "Access Forbidden"
        })
    }else{

        fs.exists('views/pages/'+folder+req.path+".html", function(exists){
            if(exists){

                res.render("pages/"+folder+req.path+".html");
            }else{
            
            res.render("pages/"+folder+"/404.html");
            }

        })
    }
    
})
