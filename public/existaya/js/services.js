app.factory("auth", ["$rootScope","$location",function($rootScope, $location){
    return {
        exists : function($http, username){
            return $http.get("/api/account/exists/"+username);
        },
        kme: function ($http, $scope,username,name,email,register,access_token,provider) {
            $http.post('/account/login')
                .success(function(response){
                })
                .error(function(response){
                    console.log(response);
                })

        },
        register : function($http, username, password, email){
            return $http.post("/api/account/register", {
                username : username,
                password : password,
                email : email
            })
        },

        ajax : function($http, $scope, username, userpassword, email){
            $scope.loader = true;
            $http.post('/api/account/login',{username : username, password:userpassword})
                .success(function(response){
                    console.log(response);
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
                    $scope.loader = false;
                })
                .error(function(response){
                    $scope.error = response.message;
                    if($scope.error == "username and/or password are incorrect"){
                        $scope.alertData = true;
                    }else{
                        $scope.alertError = true;
                    }

                    $scope.loader = false;
                });
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
