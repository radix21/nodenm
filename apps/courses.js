/**
 * @api{post} /api/courses/my_courses Get my courses
 * @apiName getMyCourses
 * @apiDescription Get user Courses
 * @apiGroup Courses
 * @apiVersion 0.1.0
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "courses" : {JSON[]}
 *  }
 * @apiErrorExample {Object} AuthenticationFailed:
 *  HTTP/1.1 400 ERROR
 *  {
 *      "status" : "failed",
 *      "message" : "User is not authenticated"
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
getMyCourses = function(req, res){
    console.log(req.session);
    if(req.session.user == undefined || !req.session.user.logged){
        response = {
            "status" : "failed",
            "message" : "User is not authenticated"
        }
        res.send(response);
    }else{
        str = "";
        data = http.get(KME_API.my_courses+"?token="+req.session.user.token+"&user="+req.session.user.info.username, function(response){
            response.on("error", function(err){
                response = {
                    "status" : "failed",
                    "message" : err
                }
                res.status(400).send(response);
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

        data.end();
    }

};
