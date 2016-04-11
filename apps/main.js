express = require("express");
SERVER = "http://marketing.kmelx.com:5000"
KME_API = {
    login : SERVER + "/api/login_token",
    logout : SERVER + "/api/json_logout",
    register : SERVER + "/api/register",
    get_statements :  SERVER + "/api/share/getUserStatements",
    insert_statement : SERVER + "/api/share/insertStatement",
    my_courses : SERVER + "/api/courses/my_courses/",
}
CLIENTS = {
    "marketinguniversity.co" : 'existaya'
}
client_folder = function(hostname){
    folder = (CLIENTS[hostname] != undefined ? (CLIENTS[hostname]+"/") : '');
    return "pages/"+folder;

}
SECRET_KEY = '1+l=j$!!n+&lwhc3)ni5kl%-h7mozdecclnv5s_se-u4a+ar9n';

module.exports = {
    server : function(){
        return express();
    }


}
