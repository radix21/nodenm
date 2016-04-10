// START SETTINGS
ejs = require("ejs");
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
account = require("./urls/account")
xapi = require("./urls/xapi")

account.set(app, public_html, http);
xapi.set(app);
kmelx.set(app);
// END KMELX APPS

