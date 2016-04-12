express = require("express");
SERVER = "http://kmelx.com"
KME_API = {
    login : SERVER + "/api/login_token",
    logout : SERVER + "/api/json_logout",
    register : SERVER + "/api/register",
    get_statements :  SERVER + "/api/share/getUserStatements",
    insert_statement : SERVER + "/api/share/insertStatement",
    my_courses : SERVER + "/api/courses/my_courses",
    public_courses : SERVER + "/api/courses/public_courses",
    all_courses : SERVER + "/api/courses/all_courses",
    course_details : SERVER + "/api/courses/course_detail",
}
CLIENTS = {
    "marketinguniversity.co" : 'existaya'
}
client_folder = function(hostname){
    folder = (CLIENTS[hostname] != undefined ? (CLIENTS[hostname]+"/") : 'default/');
    return "pages/"+folder;

}

set_client_session = function(request, data){
    request.session.user = data;
}

client_session = function(request){
    if(request.session.user == undefined){
        return {
            logged : false
        }
    }else{
        return request.session.user;
    }
}
SECRET_KEY = '1+l=j$!!n+&lwhc3)ni5kl%-h7mozdecclnv5s_se-u4a+ar9n';

module.exports = {
    server : function(){
        return express();
    }


}
