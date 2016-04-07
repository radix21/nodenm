http = require("http");
server = http.createServer(app, function(req, res){});
session = require("express-session");
cookieParser = require("cookie-parser");
bodyParser = require("body-parser");
public_html = __dirname;
module.exports = {
    use : function(app){
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false}));
        app.use(cookieParser());
        app.use(session({resave:true, saveUninitialized :true, secret: "asad#$%^&yhsd123"}));

    }
}

