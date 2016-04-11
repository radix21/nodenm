template = function(req, res){
    params = {
        user : req.session.user == undefined ? { logged : false }: req.session.user,
    }
    res.render(client_folder(req.hostname)+req.params.template, params);
}
home = function(req, res){
    params = {
        user : req.session.user == undefined ? { logged : false }: req.session.user,
    }
    res.render(client_folder(req.hostname)+"home", params);

}
profile = function(req, res){
    params = {
        user : req.session.user == undefined ? { logged : false }: req.session.user,
    }
    if(!params.user.logged){
        res.redirect("/");
    }else{
        res.render(client_folder(req.hostname)+"profile", params); 
    }
}
module.exports = {
    set : function(app){
        app.get("/", home);
        app.get("/profile", profile);
        app.get("/template/:template", template);
        server.listen(app.get("port"), function(){
            console.log('Node app is running on port', app.get('port'));
        });
    }
}
