express = require("express");
SERVER = "http://marketing.kmelx.com:5000"
KME_API = {
    login : SERVER + "/api/login_kme/",
    logout : SERVER + "/api/json_logout/",
    register : SERVER + "/api/register"
}

module.exports = {
    server : function(){
        return express();
    }


}
