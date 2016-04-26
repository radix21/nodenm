/**
 * @api{get} /api/tribes/get_tribe/:id Get Tribe data
 * @apiName get_tribe
 * @apiDescription Get Tribe data
 * @apiGroup Tribes
 * @apiVersion 0.1.0
 * @apiParam {Number} id Tribe unique ID
 *
 ***/
get_tribe = function(req, res){
    if(req.session.user == undefined && req.session.user.token == undefined){
        res.send({
            "status" : "failed",
            "message" : "User is not authenticated" 
        })
    }else{
    url = KME_API.get_tribe(req.hostname) + req.params.id + "?token="+req.session.user.token;
    str = "";
    data = http.get(url, function(response){
        response.on("error", function(err){
            console.log(err);
        })
        response.on("data", function(data){
            str+=data;
        });
        response.on("end", function(){
            try{
                str = JSON.parse(str);
                res.send(str);
            }catch(err){
                res.status(500).send(err) ;
            }
        })
    
    }).on("error", function(err){
        console.log(err);
    }).end()
    }

}

/**
 * @api{get} /api/tribes/get_topic/:id Get Topic data
 * @apiName get_topic
 * @apiDescription Get Topic data
 * @apiGroup Tribes
 * @apiVersion 0.1.0
 * @apiParam {Number} id Topic unique ID
 *
 ***/
get_topic = function(req, res){
    if(req.session.user == undefined && req.session.user.token == undefined){
        res.send({
            "status" : "failed",
            "message" : "User is not authenticated" 
        })
    }else{
    url = KME_API.get_topic(req.hostname) + req.params.id + "?token="+req.session.user.token;
    str = "";
    data = http.get(url, function(response){
        response.on("error", function(err){
            console.log(err);
        })
        response.on("data", function(data){
            str+=data;
        });
        response.on("end", function(){
            try{
                str = JSON.parse(str);
                res.send(str);
            }catch(err){
                res.status(500).send(err) ;
            }
        })
    
    }).on("error", function(err){
        console.log(err);
    }).end()
    }

}


/**
 * @api{post} /api/tribes/send_post/:id Send new comment on topic
 * @apiName send_post
 * @apiDescription Send new comment to topic
 * @apiGroup Tribes
 * @apiVersion 0.1.0
 * @apiParam {Number} id Topic unique ID
 * @apiParam {String} comment Comment on topic
 ** 
 ***/
send_post = function(req, res){
    if(req.session.user == undefined && req.session.user.token == undefined){
        res.send({
            "status" : "failed",
            "message" : "User is not authenticated" 
        })
    }else{
        url = KME_API.send_post(req.hostname) +"?topic="+ req.params.id+"&message="+req.params.comment+"&token="+req.session.user.token+"&user="+req.session.user.info.username;
        str = "";
        data = http.get(url, function(response){
            response.on("error", function(err){
                console.log(err);
            });
            response.on("data", function(data){
                str+=data;
            })
            response.on("end", function(){
                try{
                    str = JSON.parse(str);
                    res.send(str);
                }catch(err){
                    res.status(500).send(err) ;
                }
            })
        
        }).on("error", function(err){
            console.log(err);
        }).end();
    }

}


