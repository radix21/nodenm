var querystring = require('querystring'),
    form = require('form-data'),
    fs = require('fs');

addOrganization = function(req, res) {
    res.render(client_folder(req.hostname)+"login", {
        user : client_session(req)
    });
}
/**
 * @api{post} api/organization/create_organization
 * @apiName createOrganization
 * @apiDescription create a organization in the plataform
 * @apiGroup Organizations
 * @apiVersion 0.1.0
 * @apiParam {String} [name]             Name of new organization
 * @apiParam {String} [url]              Url to access this organization like: kmelx.com/organization_url
 * @apiParam {File}   [logoUpload]:      Logo image file for new organization
 * @apiParam {File}   [bannerUpload]:    Banner image file for new organization
 * @apiParam {String} [bannerColor]      Hexadecimal color code for banner
 * @apiParam {String} [fontColorBanner]: Font color of banner  
 * @apiParam {String} [textColor]        Color of text on organization banner
 * @apiParam {String} [username]         Username of organization's creator
 * @apiParam {String} [enabled_name]     Name that's shown on organization's banner
 * @apiParam {String} [position]         Position of organization banner
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
 * */
createOrganization = function(req, res) {
    var formdata = new form();
    var image = null;

    for (var k in req.body){
        console.log(1);
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

validateName = function(req, res) {}

/**
 * @api{get} /api/organization/get/:url
 * @apiName getOrganization
 * @apiDescription get information of the organization
 * @apiGroup Organizations
 * @apiVersion 0.1.0
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
 * */
getOrganization = function(req, res) {
    urlorg = req.params.url;
    data = http.get(KME_API.get_organization("kmelx.com")+urlorg+'/', function(response) {
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
 * @api{post} /api/organization/delete/:url
 * @apiName deleteOrganization
 * @apiDescription delete information of the specific organization
 * @apiGroup Organizations
 * @apiVersion 0.1.0
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
 * */
 deleteOrganization = function(req, res) {
        
    var postData = querystring.stringify({
            "username" : req.session.user.info.username,
        });

    var options = {
        host: 'kmelx.com',
        path: '/api/orgs/delete/'+req.params.url+'/',
        method: "POST",
        port: 5000,
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