/**
 * @api{get} /api/xapi/statements/ get_statements
 * @apiName getStatements
 * @apiDescription Get statements saved by user
 * @apiGroup    xapi
 * @apiVersion  0.1.0
 *
 * @apiSuccess {Object[]} 200 Get statements by user
 * {
 *      statements : {Object[]} 
 * }
 **/
getStatements = function(req, res){
    data = http.get(KME_API.get_statements, function(response){
        str = "";
        response.on("data", function(data){
            str += data;
            console.log(data);
        })
        response.on("end", function(){
            console.log(str);
            res.send(str);
        })
    })


}
