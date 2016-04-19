app.factory("auth", ["$rootScope","$location",function($rootScope, $location){
    return {
        kme: function ($http, $scope,username,name,email,register,access_token,provider) {
            $http.post('/account/login')
                .success(function(response){
                    console.log(response);
                
                })
            /**
            var uri=config.SERVICE_SERVER+'/api/login_kmeadmin/?callback=JSON_CALLBACK&username='+email+'&name='+ name +'&password='+username;
            $http.jsonp(encodeURI(uri)).success(function(response){
                if(response.status == "logged"){
                    $http.jsonp(config.SERVICE_SERVER +"/api/get_profile_data/?callback=JSON_CALLBACK&username=" + username)
                .success(function(respuesta){
                    //console.log(JSON.stringify(respuesta));
                    sessionStorage.dataUser = JSON.stringify(respuesta);
                    $rootScope.dataUser = respuesta;
                    if (provider){
                    $http.jsonp(config.SERVICE_SERVER +"/api/get_social_tokens/?callback=JSON_CALLBACK&email=" + email +"&provider="+provider+"&token="+access_token)
                    .success(function(respuesta){
                    console.log(JSON.stringify(respuesta));
                    })
                    .error(function(data,b, status,d) {
                     console.log(b,d);
                     });
                    }
                    //aqui acaba

                    $(".modal--ingreso").modal("show").toggle();

                });
            if(register){
                sendRegisterNotification($http,email);
                register = false;
            }


                }else{
                    if(response.error != undefined){
                        $("#errorLogin").html(" Nombre de usuario o correo ya existen. <br> + <br>"+ response.error);
                        $scope.alertError = true;
                    }else{
                        $scope.alertData = true;	
                    }	
                }
            });
            **/
        },


        ajax : function($http, $scope, username, userpassword, email){
            $http.post('/api/account/login',{username : username, password:userpassword})
                .success(function(response){

                    $("#errorLogin").html("");
                    status  = response.status;
                    if(status == "ok"){
                        if(location.pathname == "/"){
                            location.href = "/profile";
                        }else{
                            location.reload();
                        }
                    }else{
                        $("#errorLogin").html("Nombre de usuario y/o contraseña incorrectos");
                    }
                });
            /**
            if(!email){
                url = config.SERVICE_SERVER + "/api/json/json_login_dare/?callback=JSON_CALLBACK&username="+username+"&password="+userpassword;
                register=false;
            }else{

                url =  config.SERVICE_SERVER+"/api/registerNew/?callback=JSON_CALLBACK&username=" + username + "&password=" + userpassword + "&email="+ email;
                register = true;
            }
            $http.jsonp(url).success(function(response){

                if(response.status == "ok"){
                    $http.jsonp(config.SERVICE_SERVER +"/api/get_profile_data/?callback=JSON_CALLBACK&username=" + username).success(function(respuesta){
                        //console.log(JSON.stringify(respuesta));
                        $rootScope.dataUser = respuesta;
                        sessionStorage.dataUser = JSON.stringify(respuesta);
                        $(".modal--ingreso").modal("show").toggle();
                        $location.url("/profile");
                    });
                    if(register){
                        sendRegisterNotification($http,email);
                        register = false;
                    }else{
                    }

                }else{
                    if(response.error != undefined){
                        $("#errorLogin").html(" Nombre de usuario o correo ya existen. <br> + <br>"+ response.error);
                        $scope.alertError = true;
                    }else{
                        $scope.alertData = true;	
                    }	
                }
                **/
        }
    }
}]);
app.factory("tutors", ["$http", function($http){
    return {
        onCourse : function(slug){
            return $http.jsonp(config.SERVICE_SERVER + "/api/course/getTutors/?slug="+slug+"&callback=JSON_CALLBACK");
        },
    }   
}]);
app.factory('courses', ['$http',function($http) {
    return {
        dataStudent : function(slug){
                
            var url = '/api/course/'+slug;
            var response = $http.get(url);
            return response;    
        },
        public : function(limit){
            return $http.get("/api/courses/public_courses");
        },
        get : function(uuid, slug){
            return $http.jsonp(config.SERVICE_SERVER+"/api/courses/?uuid="+uuid+"&slug="+slug); 
        },
        completed : function(){
            return $http.get("/api/courses/completed_courses/");
        },
        available : function(){
            return $http.get("/api/courses/available_courses/");
        },
        myCourses : function(){
            return $http.get("/api/courses/my_courses/");
        },
        certifications : function(params){
            return $http.get("/api/certifications/my_certifications");
        },
        allCertificates : function(limit) {
            return $http.get('/certification/get/');
        },
        related : function(related){
            return $http.get("/api/courses/related_courses/"+slug);
        },
        absolute : function(){
            return $http.get("/api/courses/related_courses");
        },
        inscribe : function(slug){
            return $http.jsonp(config.SERVICE_SERVER+"/api/courses/inscribeUser/?course="+slug+"&callback=JSON_CALLBACK");
        },
        next : function(){
            return $http.get("/api/courses/next_courses");
        }

    }
}]);

app.factory('coursesGet', ['$http',function($http) {
	var objData = {};
	var url = config.SERVICE_SERVER + '/api/courses/?callback=JSON_CALLBACK&';
	objData.getData = function(parameter){
		return $http.jsonp(encodeURI(url + parameter + '=1'));
	}

	return objData;

}]);

app.factory("contentService", ["$http",function($http){
    return {
        getURL : function(content_pk){
            return $http.jsonp(config.SERVICE_SERVER + "/api/course/getFile/?content="+content_pk+"&callback=JSON_CALLBACK");
        }
    }

} ]);
