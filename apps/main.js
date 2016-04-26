express = require("express");
DEFAULT_SERVER = "http://marketing.kmelx.com";
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
    },
    get_tribe : function(hostname){
        return SERVER(hostname) + "/api/tribes/get/";
    },
    get_topic : function(hostname){
        return SERVER(hostname) + "/api/tribes/topic/";
    },
    send_post : function(hostname){
        return SERVER(hostname) + "/api/tribes/send_post/";
    },
    take_test : function(hostname){
        return SERVER(hostname) + "/api/contents/take_test/";
    },
    all_certifications: function(hostname) {
        return SERVER(hostname)+ "/api/courses/get_courses_certification/"
    },
    info_certification: function(hostname) {
        return SERVER(hostname)+ "/api/course/get_info_course_certification/"
    },
    fetch_exam : function(hostname){
        return SERVER(hostname) + "/api/contents/json_fetch_exam/"
    },
    fetch_user_slide : function(hostname){
        return SERVER(hostname) + "/api/contents/json_fetch_user_slide/";
    },
    finish_exam : function(hostname){
        return SERVER(hostname) + "/api/contents/json_finish_exam/";
    },
    my_certifications : function(hostname){
        return SERVER(hostname) + "/api/courses/get_user_certifications/";
    },
    inscribe_in_certification: function(hostname) {
        return SERVER(hostname)+ "/api/course/inscribe_in_certification/"
    },
    inscribe_user : function(hostname){
        return SERVER(hostname) + "/api/courses/inscribe/";
    },
    user_exists : function(hostname){
        return SERVER(hostname) + "/api/exists/";
    }

}
    
CLIENTS = {
    "www.marketinguniversity.co" : {
        folder : "existaya",
        server : "http://marketing.kmelx.com",
        token : "52qBjI45Z9Bt2QdTD820IjD2opBKwf56"
    },
    "kmelx.com" : {
        folder : "kmelx",
        server : "http://kmelx.com:5000",
        token :  "52qBjI45Z9Bt2QdTD820IjD2opBKwf56"

    },
    "localhost" :{
        folder : "existaya",
        server : "http://marketing.kmelx.com:5000",
        token : "52qBjI45Z9Bt2QdTD820IjD2opBKwf56"
    },
    "safe-beyond-13324.herokuapp.com" : {
        folder: "existaya",
        server : "http://marketing.kmelx.com",
        token :  "52qBjI45Z9Bt2QdTD820IjD2opBKwf56"
    },
    "127.0.0.1" : {
        folder : "existaya",
        server : "http://marketing.kmelx.com",
        token :  "52qBjI45Z9Bt2QdTD820IjD2opBKwf56"
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
