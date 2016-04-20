var form = require('form-data'),
    fs = require('fs'),
    querystring = require('querystring'),
    url = require('url');

/**
 * @api {post} api/orgs/add
 * @author Guillermo Castillo
 * @apiName createOrganization
 * @apiDescription create a organization in the plataform
 * @apiGroup Organizations
 * @apiVersion 1.0.0
 * @apiParam {String} [name]             Name of new organization
 * @apiParam {String} [url]              Url to access this organization like: kmelx.com/organization_url
 * @apiParam {File}   [logoUpload]:      Logo image file for new organization
 * @apiParam {File}   [bannerUpload]:    Banner image file for new organization
 * @apiParam {String} [bannerColor]      Hexadecimal color code for banner
 * @apiParam {String} [fontColorBanner]: Font color of banner  
 * @apiParam {String} [textColor]        Color of text on organization banner
 * @apiParam {String} [enabled_name]     Name that's shown on organization's banner
 * @apiParam {String} [position]         Position of organization banner
 * @apiParam {String} [bannerStatic]     URL static of banner image
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : "ok",
 *      "message" : {String}
 *  }
 *  
 * @apiErrorExample {Object} AuthenticationFailed:
 *  HTTP/1.1 400 ERROR
 *  {
 *      "status" : "failed",
 *      "message" : {String}
 *  }
 *
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
**/
exports.createOrganization = function(req, res) {

    var formdata = new form();
    var image = null;

    for (var k in req.body){
        formdata.append(k, req.body[k]);
    }

    formdata.append("username", req.session.user.info.username)

    for(var k in req.files){

        image = req.files[k][0];
        formdata.append(k, fs.createReadStream(image.path), {
            filename: image.originalname,
            contentType: image.mimetype,
            knownLength: image.size
        });
    }

    data = formdata.submit(KME_API.create_organization("kmelx.com"), function(err, response) {
        response.on('error', function(err) {
            response = {
                "status": "failed",
                "message": err
            }

            res.status(response.statusCode).send(response);
        });

        response.on("data", function(data){
            str = data;
        });

        response.on("end", function(){
            try{
                response =  JSON.parse(str);

                if(response.status == "ok"){
                    res.send(response);
                }else{
                    res.status(400).send(response);
                }
            }catch(err){
                response = {
                    "status" : "error",
                    "message" : "Server Error - check endpoint server"
                }
                res.status(500).send(response)
            }
        })
    });
}

exports.validateName = function(req, res) {}

/**
 * @api {get} /api/orgs/get/:url
 * @author Guillermo Castillo
 * @apiName getOrganization
 * @apiDescription get information of the organization
 * @apiGroup Organizations
 * @apiVersion 1.0.0
 * @apiParam {String} [url]   Url to access this organization like: kmelx.com/organization_url
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "msg" : {String}
 *  }
 *  
 * @apiErrorExample {Object} AuthenticationFailed:
 *  HTTP/1.1 400 ERROR
 *  {
 *      "status" : "{String}",
 *      "message" : "{String}"
 *  }
 *
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  
 *
**/
exports.getOrganization = function(req, res) {
    var urlorg = req.params.url;
    var data = http.get(KME_API.get_organization("kmelx.com")+urlorg+'/', function(response) {
        response.on('error', function(err) {
            response = {
                "status": "failed",
                "message": err
            }

            res.status(response.statusCode).send(response);
        });

        response.on("data", function(data){
            str = data;
        });

        response.on("end", function(){
            try{
                response =  JSON.parse(str);

                if(response.status == "ok"){
                    res.send(response);
                }else{
                    res.status(400).send(response);
                }
            }catch(err){
                response = {
                    "status" : "error",
                    "message" : "Server Error - check endpoint server"
                }
                res.status(500).send(response)
            }
        })
    });

    data.end();
}

/**
 * @api {post} /api/orgs/edit/:url
 * @author Guillermo Castillo
 * @apiName editOrganization
 * @apiDescription edit information of the specific organization
 * @apiGroup Organizations
 * @apiVersion 1.0.0
 * @apiParam {String} [name]             Name of new organization
 * @apiParam {String} [url]              Url to access this organization like: kmelx.com/organization_url
 * @apiParam {File}   [logoUpload]:      Logo image file for new organization
 * @apiParam {File}   [bannerUpload]:    Banner image file for new organization
 * @apiParam {String} [bannerColor]      Hexadecimal color code for banner
 * @apiParam {String} [fontColorBanner]: Font color of banner  
 * @apiParam {String} [textColor]        Color of text on organization banner
 * @apiParam {String} [enabled_name]     Name that's shown on organization's banner
 * @apiParam {String} [position]         Position of organization banner
 * @apiParam {String} [bannerStatic]     URL static of banner image
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "msg" : ""
 *  }
 *  
 * @apiErrorExample {Object} AuthenticationFailed:
 *  HTTP/1.1 400 ERROR
 * 
 *  {
 *      "status" : "failed",
 *      "message" : "{String}"
 *  }
 *
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
**/
exports.editOrganization = function(req, res) {
    var formdata = new form(),
        image = null;

    for (var k in req.body){
        formdata.append(k, req.body[k]);
    }

    formdata.append("username", req.session.user.info.username)

    for(var k in req.files){
        image = req.files[k][0];
        formdata.append(k, fs.createReadStream(image.path), {
            filename: image.originalname,
            contentType: image.mimetype,
            knownLength: image.size
        });
    }

    data = formdata.submit(KME_API.edit_organization("kmelx.com")+req.params.url+'/', function(err, response) {
        if (response === undefined)
            return res.status(500).send({
                "status" : "error",
                "message" : "Server not found!"
            });

        response.on('error', function(err) {
            response = {
                "status": "failed",
                "message": err
            }

            res.status(response.statusCode).send(response);
        });

        response.on("data", function(data){
            str = data;
        });

        response.on("end", function(){
            try{
                response =  JSON.parse(str);

                if(response.status == "ok"){
                    res.send(response);
                }else{
                    res.status(400).send(response);
                }
            }catch(err){
                response = {
                    "status" : "error",
                    "message" : "Server Error - check endpoint server",
                }
                res.status(500).send(response)
            }
        })
    });
}

/**
 * @api{post} /api/orgs/delete/:url
 * @author Guillermo Castillo
 * @apiName deleteOrganization
 * @apiDescription delete information of the specific organization
 * @apiGroup Organizations
 * @apiVersion 1.0.0
 * @apiParam {String} [url]  Url to access this organization like: kmelx.com/organization_url
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "msg" : ""
 *  }
 *  
 * @apiErrorExample {Object} AuthenticationFailed:
 *  HTTP/1.1 400 ERROR
 * 
 *  {
 *      "status" : "failed",
 *      "message" : "{String}"
 *  }
 *
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
**/
exports.deleteOrganization = function(req, res) {
    var urldelete = url.parse(KME_API.edit_organization("kmelx.com"))
    var postData = querystring.stringify({
        "username" : req.session.user.info.username,
    });
    var options = {
        host: urldelete.hostname,
        path: urldelete.path+req.params.url+'/',
        method: "POST",
        port: urldelete.port,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    }

    var data = http.request(options, function(response) {
        response.on('error', function(err) {
            response = {
                "status": "failed",
                "message": err
            }

            res.status(response.statusCode).send(response);
        });

        response.on("data", function(data){
            str = data;
        });

        response.on("end", function(){
            try{
                response =  JSON.parse(str);

                if(response.status == "ok"){
                    res.send(response);
                }else{
                    res.status(400).send(response);
                }
            }catch(err){
                response = {
                    "status" : "error",
                    "message" : "Server Error - check endpoint server"
                }
                res.status(500).send(response)
            }
        })
    });

    data.write(postData);
    data.end();
}

/**
 * @api{post} /api/orgs/state/:url/
 * @author Guillermo Castillo
 * @apiName changeStateOrganization
 * @apiDescription change the state of o specific organization active/inactive
 * @apiGroup Organizations
 * @apiVersion 1.0.0
 * @apiParam {String} url  Url to access this organization like: kmelx.com/organization_url
 * @apiParam {string="active","inactive"} state  state of organization active/inactive
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "msg" : ""
 *  }
 *  
 * @apiErrorExample {Object} AuthenticationFailed:
 *  HTTP/1.1 400 ERROR
 * 
 *  {
 *      "status" : "failed",
 *      "message" : "{String}"
 *  }
 *
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
**/

exports.changeStateOrganization = function(req, res) {
    if (req.body.state != "active" && req.body.state != "inactive"){
        res.writeHead(400, {
            "Content-Type": "application/json"
        })
        return res.end(JSON.stringify({
            "status": "failed",
            "message": "the state parameter must contain the active or inactive value",
        }));
    }

    var urlstate = url.parse(KME_API.set_status_organization("kmelx.com"));
    var postData = querystring.stringify({
        "username" : "guiller93",
        "state": req.body.state,
    });
    var options = {
        host: urlstate.hostname,
        path: urlstate.path+req.params.url+'/',
        method: "POST",
        port: urlstate.port,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    }

    var data = http.request(options, function(response) {
        var str = "";

        response.on('error', function(err) {
            response = {
                "status": "failed",
                "message": err
            }

            res.status(response.statusCode).send(response);
        });

        response.on("data", function(data){
            str += data;
        });

        response.on("end", function(){
            try{
                response =  JSON.parse(str);

                if(response.status == "ok"){
                    res.send(response);
                }else{
                    res.status(400).send(response);
                }
            }catch(err){
                response = {
                    "status" : "error",
                    "message" : "Server Error - check endpoint server"
                }
                res.status(500).send(response)
            }
        })
    });

    data.write(postData);
    data.end();
}