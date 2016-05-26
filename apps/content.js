/**
 * @api{get} /api/content/take_test/ Start Exam
 * @apiName take_test
 * @apiDescription Start user exam
 * @apiVersion 0.1.0
 * @apiGroup Contents
 * @apiSuccessExample {json} SuccessResponse
 * HTTP/1.1 200 OK
 * {
 *      {JSON}
 * }
 ***/
take_test = function(req, res){
    var hrstart = process.hrtime();
    if(req.session.user == undefined || req.session.user.token == undefined){
        res.send({
            status : "failed",
            message : "User is not authenticated"
        })
    }else{
        
        url = KME_API.take_test(req.hostname) + "?content="+req.query.content+"&module="+req.query.module+"&token="+req.session.user.token+"&user="+req.session.user.info.username;
        str = "";
        data = http.get(url, function(response){
            response.on("error", function(err){
                res.status(400).send({
                    status: "failed",
                    message : err
                })
            });
            response.on("data", function(data){
                str += data;
            });

            response.on("end", function(){
                try{
                    res.send(JSON.parse(str));
                }catch(err){
                    res.send(str);
                }
            })
        
        }).on("error", function(err){
            res.status(500).send({
                "status" : "error",
                "message" : err
            })
        }).end()
    }
    hrend = process.hrtime(hrstart);;
    console.info("Execution time (take_test): %ds %dms", hrend[0], hrend[1]/1000000);
}
/**
 * @api{get} /api/content/json_fetch_exam/ Get exam status
 * @apiName fetch_exam
 * @apiDescription Get exam status
 * @apiVersion 0.1.0
 * @apiGroup Contents
 * @apiSuccessExample {json} SuccessResponse
 * HTTP/1.1 200 OK
 * {
 *      {JSON}
 * }
*
 ***/
fetch_exam = function(req, res){
    var hrstart = process.hrtime();
    if(req.session.user == undefined || req.session.user.token == undefined){
        res.send({
            status : "failed",
            message : "User is not authenticated"
        })
    }else{
        url = KME_API.fetch_exam(req.hostname)+parseInt(req.query.course)+"/"+req.query.ubs+"/"+req.query.module+"/"+req.query.content+"/"+req.query.exam;
        request("GET", url,{
            qs : {
                token : req.session.user.token,
                user : req.session.user.info.username
            }
        }).done(function(response){
            if(response.statusCode > 300){
                res.status(response.statusCode).send({
                    status : "error",
                    error : response.statusCode
                })
            }else{
                try{
                    response = JSON.parse(response.getBody())
                    res.send(response)
                }catch(err){
                    res.send(response.getBody())
                }
            }
        })
        //url = KME_API.fetch_exam(req.hostname) + 
        /**
        url = KME_API.fetch_exam(req.hostname) + "?exam="+req.query.exam+"&contentId="+req.query.contentId+"&token="+req.session.user.token+"&user="+req.session.user.info.username;
        str = "";
        data = http.get(url, function(response){
            response.on("error", function(err){
                res.status(400).send({
                    status: "failed",
                    message : err
                })
            });
            response.on("data", function(data){
                str += data;
            });

            response.on("end", function(){
                try{
                    res.send(JSON.parse(str));
                }catch(err){
                    res.send(str);
                }
            })
        
        }).on("error", function(err){
            res.status(500).send({
                "status" : "error",
                "message" : err
            })
        }).end()
        */
    }
    console.info("Execution time (fetch_exam): %ds %dms", hrend[0], hrend[1]/1000000);

}
/**
 * @api{get} /api/content/json_fetch_user_slide/ Get slide status
 * @apiName fetch_user_slide
 * @apiDescription Get slide status
 * @apiVersion 0.1.0
 * @apiGroup Contents
 * @apiSuccessExample {json} SuccessResponse
 * HTTP/1.1 200 OK
 * {
 *      {JSON}
 * }
*
 ***/
fetch_user_slide = function(req, res){
    var hrstart = process.hrtime();
    if(req.session.user == undefined || req.session.user.token == undefined){
        res.send({
            status : "failed",
            message : "User is not authenticated"
        })
    }else{
        url = KME_API.fetch_user_slide(req.hostname) + req.query.course + "/" + req.query.ubs + "/"+ req.query.module + "/" + req.query.content + "/" + req.query.exam+"?token="+req.session.user.token+"&user="+req.session.user.info.username+"&choices="+req.query.choices+"&position="+req.query.position+"&actual_position="+req.query.actual_position;
        console.log(url);
        request("GET", url).done(function(response){
            if(response.statusCode > 300){
                res.status(response.statusCode).send({
                    status : "error",
                    error: response.statusCode
                })
            }else{
                try{
                    response = JSON.parse(response.getBody())
                    res.send(response);
                }catch(err){
                    res.send(response.getBody())
                }
            }
        })
    }
    console.info("Execution time (fetch_user_slide): %ds %dms", hrend[0], hrend[1]/1000000);
}

/**
 * @api{get} /api/content/json_finish_exam Finish exam
 * @apiName finish_exam
 * @apiDescription Finish exam
 * @apiVersion 0.1.0
 * @apiGroup Contents
 * @apiSuccessExample {json} SuccessResponse
 * HTTP/1.1 200 OK
 * {
 *      {JSON}
 * }

 ***/
finish_exam = function(req, res){
    var hrstart = process.hrtime();
    if(req.session.user == undefined || req.session.user.token == undefined){
        res.send({
            status : "failed",
            message : "User is not authenticated"
        })
    }else{ 
        if(Array.isArray(req.query.exam)){
            exam = req.query.exam[0];
        }else{
            exam = req.query.exam
        }
        url = KME_API.finish_exam(req.hostname) + "?exam="+exam+"&token="+req.session.user.token+"&user="+req.session.user.info.username+"&choices="+(req.query.choices == undefined ? "{}" : req.query.choices)+"&actual_position="+(req.query.actual_position == undefined ? 0 : req.query.actual_position);
        str = "";
        data = http.get(url, function(response){
            response.on("error", function(err){
                res.status(400).send({
                    status: "failed",
                    message : err
                })
            });
            response.on("data", function(data){
                str += data;
            });

            response.on("end", function(){
                try{
                    res.send(JSON.parse(str));
                }catch(err){
                    res.send(str);
                }
            })
        
        }).on("error", function(err){
            res.status(500).send({
                "status" : "error",
                "message" : err
            })
        }).end()
    }
    console.info("Execution time (finish_exam): %ds %dms", hrend[0], hrend[1]/1000000);
}
