/**
 * @api{get} /account/login
 * @apiName loginView
 * @apiDescription Load login template with params
 * @apiGroup    account
 * @apiVersion  0.1.0
 *
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
    params = {
    
    }
    res.render(client_folder(req.hostname)+"login", params);
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
 * @apiVersion 0.1.0
 *
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
    data = http.get(KME_API.login+"/?username="+username+"&password="+password, function(response){
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
                console.log(str);
                if(response.status == "ok"){
                    data = {
                        status : "ok"
                    }

                    req.session.user = {
                        logged : true,
                        info : response.user,
                        token : response.token
                    }
                    console.log(req.session.user);
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
    });
}
/**
 *
 * @api{post} /api/account/logout Logout
 * @apiName logout
 * @apiDescription Close session
 * @apiGroup account
 * @apiVersion 0.1.0
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok
 *  }
 *
 * */

logout = function(){
    data = http.get(KME_API.logout, function(response){
        str = "";
        response.on("data", function(data){
            str += data;
        })
        response.on("end", function(){
            try{
                response = JSON.parse(str);
                if(response.status == "ok"){
                    response = {
                        status : "ok"
                    }
                    req.session.destroy();
                }else{
                    response = {
                        status : "failed",
                        message : "username and/or password are incorrect"
                    }
                }
                res.send(response);
            }catch(err){
                response = {
                    "status" : "error",
                    "message" : "Bad Request"
                }
                res.status(400).send(response);
            }
        })
    });;
}

/**
 *
 * @api{post} /api/account/register Register
 * @apiName Register
 * @apiDescription Allows register a user on platform
 * @apiGroup account
 * @apiVersion 0.1.0
 *
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
    data = http.get(KME_API.register, function(response){
        str = "";
        response.on("data", function(data){
            str += data;
        })
        response.on("end", function(){
            try{
                response = JSON.parse(str);
                if(response.status == "ok"){
                    response = {
                        status : "ok"
                    }
                    req.session.user = {
                        logged : true,
                        username : response.username
                    }

                    res.send(response);


                }else{
                    response = {
                        status : "failed",
                        message : response.error
                    }

                    res.status(400).send(response);
                }

            }catch(err){
                response = {
                    "status" : "failed",
                    "message" : "Bad Request"
                }

                res.status(400).send(response);
            }

        })
    });;
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
    console.log(logged);
    response = {
        "logged" : logged
    }
    res.send(response);
}
