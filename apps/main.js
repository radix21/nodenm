express = require("express");
DEFAULT_SERVER = "http://marketing.kmelx.com:5000";
SERVER = function(hostname){

    return CLIENTS[hostname] == undefined ? DEFAULT_SERVER : CLIENTS[hostname]["server"];
}
KME_API = {
    login : function(hostname){
        return SERVER(hostname) + "/api/login_token";
    },
    logout : function(hostname){
        return SERVER(hostname) + "/api/json_logout";
    },
    register : function(hostname){
        return SERVER(hostname) + "/api/register";
    },
    get_statements : function(hostname){
        return SERVER(hostname) + "/api/share/getUserStatements";
    },
    insert_statement : function(hostname){
        return SERVER(hostname) + "/api/share/insertStatement";
    },
    my_courses : function(hostname){
        return SERVER(hostname) + "/api/courses/my_courses";
    },
    public_courses : function(hostname){
        console.log(SERVER(hostname));
        return SERVER(hostname) + "/api/courses/public_courses";
    },
    all_courses : function(hostname){
        return SERVER(hostname) + "/api/courses/all_courses";
    },
    course_details : function(hostname){
        return SERVER(hostname) + "/api/courses/course_detail";
    },
    related_courses : function(hostname){
        return SERVER(hostname) + "/api/courses/related_courses";
    },
    completed_courses : function(hostname){
        return SERVER(hostname) + "/api/courses/completed_courses";
    },
    create_organization: function(hostname) {
        return SERVER(hostname) + "/api/orgs/add/"
    },
    get_organization: function(hostname) {
        return SERVER(hostname) + "/api/orgs/get/"
    },
    available_courses : function(hostname){
        return SERVER(hostname) + "/api/courses/available_courses";
    },
    next_courses : function(hostname){
        return SERVER(hostname) + "/api/courses/next_courses";
    },
    get_course_data_student : function(hostname){
        return SERVER(hostname) + "/api/courses/get_course_data_student";
    }
}
    
CLIENTS = {
    "marketinguniversity.co" : {
        folder : "existaya",
        server : "http://marketing.kmelx.com:5000"
    },
    "kmelx.com" : {
        folder : "kmelx",
        server : "http://kmelx.com:5000"
    "localhost" :{
        folder : "existaya",
        server : "http://marketing.kmelx.com:5000"
    }
}
client_folder = function(hostname){
    folder = (CLIENTS[hostname] != undefined ? (CLIENTS[hostname]["folder"]+"/") : 'default/');
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
