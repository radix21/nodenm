express = require("express");
SERVER = "http://marketing.kmelx.com"
KME_API = {
    login : SERVER + "/api/login_token",
    logout : SERVER + "/api/json_logout",
    register : SERVER + "/api/register",
    get_statements :  SERVER + "/api/share/getStatements",
}
SECRET_KEY = '1+l=j$!!n+&lwhc3)ni5kl%-h7mozdecclnv5s_se-u4a+ar9n';

module.exports = {
    server : function(){
        return express();
    }


}
