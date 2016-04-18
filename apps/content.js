/**
 * @api{get} /api/content/take_test/ Start Exam
 * @apiName take_test
 * @apiDescription Start user exam
 * @apiVersion 0.1.0
 *
 ***/
take_test = function(req, res){
    if(req.session.user == undefined || req.session.user.token == undefined){
        res.send({
            status : "failed",
            message : "User is not authenticated"
        })
    }else{
        
        url = KME_API.take_test(req.hostname) + "?content="+req.query.content+"&module="+req.query.module+"&token="+req.session.user.token+"&user="+req.session.user.info.username;
        console.log(req);
        console.log(url);
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

}
/**
 * @api{get} /api/content/json_fetch_exam/ Get exam status
 * @apiName fetch_exam
 * @apiDescription Get exam status
 * @apiVersion 0.1.0
 *
 ***/
fetch_exam = function(req, res){
    if(req.session.user == undefined || req.session.user.token == undefined){
        res.send({
            status : "failed",
            message : "User is not authenticated"
        })
    }else{
        
        url = KME_API.fetch_exam(req.hostname) + "?exam="+req.query.exam+"&contentId="+req.query.contentId+"&token="+req.session.user.token+"&user="+req.session.user.info.username;
        console.log(req);
        console.log(url);
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

}
/**
 * @api{get} /api/content/json_fetch_user_slide/ Get slide status
 * @apiName fetch_user_slide
 * @apiDescription Get slide status
 * @apiVersion 0.1.0
 *
 ***/
fetch_user_slide = function(req, res){
    if(req.session.user == undefined || req.session.user.token == undefined){
        res.send({
            status : "failed",
            message : "User is not authenticated"
        })
    }else{
        
        url = KME_API.fetch_user_slide(req.hostname) + "?exam="+req.query.exam+"&token="+req.session.user.token+"&user="+req.session.user.info.username;
        console.log(req);
        console.log(url);
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

}

/**
 * @api{get} /api/content/json_finish_exam Finish exam
 * @apiName finish_exam
 * @apiDescription Finish exam
 * @apiVersion 0.1.0
 *
 ***/
finish_exam = function(req, res){
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
        url = KME_API.finish_exam(req.hostname) + "?exam="+exam+"&token="+req.session.user.token+"&user="+req.session.user.info.username;
        console.log(req);
        console.log(url);
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

}
