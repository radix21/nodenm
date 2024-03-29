var crypto = require("crypto");
/**
 * @api{get} /account/login
 * @apiName loginView
 * @apiDescription Load login template with params
 * @apiGroup    account
 * @apiSuccess {Object[]} 200 Params related with user
 * {
 *      user : {
 *          "logged" : {Boolean},
 *          "username" : {String},
 *          "first_name" : {String},
 *          "last_name" : {String},
 *          "groups" : {String[]},
 *          "is_admin" : {Boolean},
 *          "is_staff" : {Boolean}
 *      }
 * }
 **/
loginView = function(req, res){
    res.render(client_folder(req.hostname)+"login", {
        user : client_session(req)
    });
}

recover = function(req, res){
    res.render(client_folder(req.hostname)+"olvidar-contrasena",{
        data : null
    });
}
restart = function(req, res){
    res.render(client_folder(req.hostname)+"restablecer-contrasena",{
        key : req.params.key,
        uid : req.params.uid
    });
}
/**
 * 
 *
 * @api{post} /api/account/login Login
 * @apiName login
 * @apiDescription Request for authentication
 * @apiGroup account
 * @apiParam {String} username Name of the user
 * @apiParam {String} password Password of the user
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok
 *  }
 * @apiErrorExample {Object} AuthenticationFailed:
 *  HTTP/1.1 400 ERROR
 *  {
 *      "status" : "failed",
 *      "message" : "username and/or passowrd are incorrect"
 *
 *  }
 *
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
 * */
login = function(req, res){
    username = req.body.username;
    password = req.body.password;
    data = http.get(KME_API.login(req.hostname)+"/?username="+username+"&password="+password, function(response){
        str = "";
        response.on("data", function(data){
            str += data;
        })
        response.on("error", function(err){
            res.status(400).send({
                "status" : "error",
                "message" : err

            })
        })
        response.on("end", function(){
            try{
                response = JSON.parse(str);
                if(response.status == "ok"){
                    data = {
                        status : "ok"
                    }
                    set_client_session(req, {
                        logged : true,
                        info : response.user,
                        token : response.token
                    })
                    res.send(data)
                }else{
                    response = {
                        status : "failed",
                        message : "username and/or password are incorrect"
                    }
                    res.status(400).send(response);
                }
            }catch(err){
                response = {
                    "status" : "error",
                    "message" : "Server Error - check endpoint server"
                }
                res.status(500).send(response);
            }
        })
    }).on("error", function(err){
        res.status(500).send(err);
    });
}
/**
 *
 * @api{post} /api/account/logout Logout
 * @apiName logout
 * @apiDescription Close session
 * @apiGroup account
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok
 *  }
 *
 * */

logout = function(req, res){

    req.session.destroy();
    res.send({
        "status" : "ok"
    })
}

/**
 *
 * @api{post} /api/account/register Register
 * @apiName Register
 * @apiDescription Allows register a user on platform
 * @apiGroup account
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok
 *  }
 *
 * @apiErrorExample Missing parameters
 *  HTTP/1.1 400 ERROR
 *  {
 *      "status" : "failed",
 *      "message" : "Bad Request"
 *  }
 *
 * @apiErrorExample username or email already taken
 *  HTTP/1.1 400 ERROR
 *  {
 *      "status" : "failed",
 *      "message" : "username or email already taken"
 *  }
 *
 * */

register = function(req, res){
    url = KME_API.register(req.hostname)+"/?username="+req.body.email+"&password="+req.body.password+"&email="+req.body.email;
    json_response = {};
    request("GET", url).done(function(response){
        if(response.statusCode > 300){
            res.status(response.statusCode).send({
                status : "failed",
                error : response.statusCode
            });
        }else{
            try{
                response = JSON.parse(response.getBody());
                if(response.status == "ok"){
                    req.session.user = {};
                    req.session.user.info = response.user;
                    req.session.user.token = response.token;
                    req.session.user.logged = true;
                    userCRM = registerUserCRM("http://crm.marketinguniversity.co/custom/service/v4_1_custom/rest.php", req.session.user);
                    if (!userCRM) {
                        json_response = {
                            status : "warning",
                            message: "user is not created in CRM"
                        };
                    }
                    json_response = {
                        status : "ok"
                    }
                    res.send(json_response);
                 
                }else{
                   json_response = {
                        status : "failed",
                        message : response.message
                    }
                }
            }catch(err){

                res.send(response.getBody());
            
            }
        }
    });

}

/**
 * @api{post} /api/account/is_authenticated/ is_authenticated
 * @apiName isAuthenticated
 * @apiDescription  return logged status in session
 * @apiGroup account
 * @apiSuccessExample {JSON} Success-response
 *  HTTP/1.1 200 OK
 *  {
 *      "logged" : {Boolean}
 *  }
 *
 * */
isAuthenticated = function(req, res){
    logged = req.session.user != undefined ? req.session.user.logged : false;
    response = {
        "logged" : logged,
        "data" : req.session
    }
    res.send(response);
}

/**
 * @api{get} /api/account/exists/:username User exists?
 * @apiName user_exists
 * @apiDescription Function that return is a username is already taken
 * @apiGroup account
 * @apiSuccessExample Success-response
 * HTTP/1.1 200 OK
 * {
 *      status : {String},
 *      exists : {Boolean}
 * }
 ***/
user_exists = function(req, res){
    url = KME_API.user_exists(req.hostname)+req.params.username;
    request("GET", url).done(function(response){
        if(response.statusCode > 300){
            res.status(response.statusCode).send({
                status : "failed",
                error : response.statusCode
            })
        }else{
            try{
                response = JSON.parse(response.getBody())
                res.send(response);
            }catch(err){
                res.send(500).send(response.getBody())
            }
        }
    })
}

/**
 * @apiName register_user_CRM
 * @apiDescription Function that return true or false if user is created in CRM
 * @apiGroup account
 * @apiSuccessExample Success-response
 * HTTP/1.1 200 OK
 * {
 *      status : {String},
 *      exists : {Boolean}
 * }
 ***/
registerUserCRM = function(url, user) {
    var id = user.info.id,
        username = user.info.username,
        first_name = user.info.first_name,
        last_name = user.info.last_name,
        email = user.info.email,
        session_id = "";
    
    request("POST", url, {
        qs: {
            method: "loginCRM",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify({
                user_auth: {
                    user_name: "KME",
                    password: crypto.createHash('md5').update("Km3123").digest("hex")
                }
            })
        }
    }).done(function(response1) {
        session_id = JSON.parse(response1.getBody());
        
        if (typeof session_id != "string") {
            return false;   
        }
        
        request("POST", url, {
            qs: {
                method: "createUser",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: JSON.stringify({
                    session: session_id,
                    data:{
                        user_name: username,
                        first_name: first_name,
                        last_name: last_name,
                        kme_user_id_c: id,
                        mku_user_type_c: "Registrado",
                        email: email
                    }
                })
            }
        }).done(function(response2) {
         
            response = JSON.parse(response2.getBody());
         
            if (typeof response == "string") {
                return true;
            }else{
                return false;
            }

        });
    });
}

/**
 * @api{get} /api/account/getmutoken/
 * @apiName getMUToken
 * @apiDescription Function that return token encrypt in md5(Date now, userid, token)
 * @apiGroup account
 * @apiSuccessExample Success-response
 * HTTP/1.1 200 OK
 * {
 *      status : {String},
 *      mutoken : {String}
 * }
 * @apiErrorExample user is not session
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "failed",
 *      "message" : "not user found!"
 *  }
 ***/
getMUToken = function(req, res) {
    if (req.session.user != undefined){
        var datetime = new Date().toISOString().substring(0,10),
            userid = req.session.user.info.id,
            token = req.session.user.token;

        res.status(200).send({
            status : "success",
            mutoken : crypto.createHash('md5').update(datetime+"~"+userid+"~"+token).digest("hex")
        });
    }else{
        res.status(500).send({
            status : "failed",
            error : "not user found!"
        });
    }
}

/**
 * @api{get} /api/account/uploadavatar/
 * @apiName uploadAvatar
 * @apiDescription Function that modify the profile image of user
 * @apiGroup account
 * @apiSuccessExample Success-response
 * HTTP/1.1 200 OK
 * {
 *      status : {String}
 * }
 * @apiErrorExample user is not session
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "failed",
 *      "error" : {String}
 *  }
 ***/
 
 uploadAvatar = function(req, res) {
    var username = req.body.username;
    var url = req.body.url;
    
    request('GET', KME_API.upload_avatar(req.hostname), {
        qs: {
            username: username,
            avatar_url: url
        },
    }).done(function(response){
        if(response.statusCode > 300){
            res.status(response.statusCode).send({
                status : "failed",
                error : response.statusCode
            });
        }else{
            try{
                response = JSON.parse(response.getBody())
                res.send(response);
            }catch(err){
                res.send(500).send(response.getBody())
            }
        }
    })
}
restartPasswd = function(req, res) {
    request('GET', KME_API.restart_passwd(req.hostname), {
        qs: {
            password: req.body.password,
            key:req.body.key,
            uidb:req.body.uid, 
        },
    }).done(function(response){
        if(response.statusCode > 300){
            res.status(response.statusCode).send({
                status : "failed",
                error : response.statusCode
            });
        }else{
            try{
                response = JSON.parse(response.getBody())
                res.send(response);
            }catch(err){
                res.send(500).send(response.getBody())
            }
        }
    })
}
resetPasswd = function(req, res) {
    var username = req.body.username;
    request('GET', KME_API.reset_passwd(req.hostname), {
        qs: {
            username: username
        },
    }).done(function(response){
        if(response.statusCode > 300){
            res.status(response.statusCode).send({
                status : "failed",
                error : response.statusCode
            });
        }else{
            try{
                response = JSON.parse(response.getBody())
                res.send(response);
            }catch(err){
                res.send(500).send(response.getBody())
            }
        }
    })
}
