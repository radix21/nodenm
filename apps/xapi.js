/**
 * @api{get} /api/xapi/statements/ get_statements
 * @apiName getStatements
 * @apiDescription Get statements saved by user
 * @apiGroup    XAPI
 * @apiVersion  0.1.0
 *
 * @apiSuccessExample {Object[]} 200 Get statements by user
 * {
 *      status : "ok",
 *      statements : {Object[]} 
 * }
 * @apiErrorExample {JSON} 400 AuthenticationFailed
 * {
 *      "status": "failed",
 *      "message": "User is not authenticated"
 *  }
 **/
getStatements = function(req, res){
    str = "";
    data = req.session;
    if(data.user != undefined){
        url = KME_API.get_statements+"?token="+data.token+"&user="+data.user.username;
        data = http.get(url, function(response){
            response.on("data", function(data){
                str += data;
            });
            response.on("error", function(err){
                response = {
                    "status" : "error",
                    "message" : err
                }
                res.status(400).send(response);
            });
            response.on("end", function(){
                str = JSON.parse(str)
                statements = JSON.parse(str.statements);
                status = str.status;

                if(status != "ok"){
                    res.status(400).send(str);
                }else{
                    response = {
                        status : status,
                        statements : statements
                    }
                    res.send(response);
                }
            })
        });
        data.end();
    }else{
        res.status(400).send({
            status : "failed",
            message : "User is not authenticated"
        })
    }
}
/**
 * @api{post} /api/xapi/statements InsertStatement
 * @apiName InsertStatement
 * @apiDescription Insert statement as xapi
 * @apiGroup XAPI
 * @apiVersion 0.1.0
 *
 * @apiSuccessExample   success-response
 * HTTP/1.1 200 OK
 * {
 *      status : "ok",
 *      message : {String},
 *      bookmark_success : {Object[]},
 *      bookmark_failed : {Object[]}
 * }
 *
 * @apiErrorExample StatementMissing
 *  HTTP/1.1 400 ERROR
 *  {
 *      "status" : "failed",
 *      "message" : {String},
 *      "error" : {String}
 *  }
 * @apiErrorExample ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : {String}
 *  }
 *
 **/
insertStatement = function(req, res){
    url = KME_API.insert_statement;
    str = "";
    data = http.get(url, function(response){
        response.on("error", function(err){
            res.status(500).send({
                status : "error",
                error : err
            });
            
        });
        response.on("data", function(data){
            str+= data;
        });
        response.on("end", function(){
            try{
                response = JSON.parse(str);
                res.send(response);
            }catch(err){
                res.status(500).send({
                    "status" : "error",
                    "message" : "Server Error - check endpoint server"
                })
            }
        })
    });
    data.end();
 }

