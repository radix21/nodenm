folderTemplate = function(req, res){
    res.render(client_folder(req.hostname)+req.params.folder+"/"+req.params.template, {
        user : client_session(req),
    });
}
template = function(req, res){
    res.render(client_folder(req.hostname)+req.params.template, {
        user : client_session(req),
    });
}
home = function(req, res){
    params = {
        user : req.session.user == undefined ? { logged : false }: req.session.user,
    }
    res.render(client_folder(req.hostname)+"home", {
        user : client_session(req),
    });

}
profile = function(req, res){
    user = req.session.user == undefined ? { logged : false }: req.session.user;
    
    if(!user.logged){
        res.redirect("/");
    }else{
        res.render(client_folder(req.hostname)+"profile", {
            user : client_session(req)
        }); 
    }
}
module.exports = {
    set : function(app){
        app.get("/", home);
        app.get("/profile", profile);
        app.get("/template/:template", template);
        app.get("/template/:folder/:template", folderTemplate);
        server.listen(app.get("port"), function(){
            console.log('Node app is running on port', app.get('port'));
        });
    }
}
