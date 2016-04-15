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
        
        url = KME_API.take_test(req.hostname) + "?content="+req.params.content+"&module="+req.params.module+"&token="+req.session.user.token+"&user="+req.session.user.info.username;
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
