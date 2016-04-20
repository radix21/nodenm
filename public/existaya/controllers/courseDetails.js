app.controller("courseDetails", ["$http", "$scope", "$location", "$rootScope","courses", "$sce",function($http, $scope, $location, $rootScope, courses, $sce){
    //TODO: incribeUser
    $scope.inscribeUserOnCOurse = function(){
        courses.inscribe($routeParams.slug).success(function(response){
            if(response.status == "ok"){
                $location.path("#/course/"+$routeParams.slug);
            }
        });
    }
    $scope.slug=  slug;
    $rootScope.detailGetInCourse = false;
    $rootScope.detailRegisterCourse = false;
    $scope.url = "course/"+slug;
    $rootScope.$watch("detailGetInCourse", function(){
        $scope.showGetInButton = $rootScope.detailGetInCourse;
        console.log("ingresar", $scope.showGetInButton);
    });
    $rootScope.$watch("detailRegisterCourse", function(){
        $scope.showRegisterButton = $rootScope.detailRegisterCourse;

        console.log("registrar", $scope.showRegisterButton);
    })
	var dataSessionInitial,
		dataSessionFinal;
    $scope.dataDetails = data;
    if(data.ubs != null){
        date = new Date(data.ubs.initial_date);
        now = new Date();
        if(date > now){
            $scope.hideButton = true;
        }
    }
    /**
	var url = config.SERVICE_SERVER + '/api/courses/get/?callback=JSON_CALLBACK&slug=' +slug;
		$http.jsonp(encodeURI(url)).success(function(response){
			$scope.dataDetails = response[0];
			$scope.dataSessionDates = []
            console.log(response);
            if(response.length > 0){
                for (var i = 0; i < response[0].sessions.length; i++) {
                    session = response[0].sessions[i];
                    init = new Date(session.initial_date);
                    end = new Date(session.final_date);
                    $scope.dataSessionDates.push({
                        "dates" : init.toDateString() + " - " + end.toDateString(),
                        "initial_date" : session.initial_date,
                        "final_date" : session.final_date
                    });


                };
            };
		})
    	.error(function(data, status, headers, config){
            console.log(data, status, headers, config);
    	});	
    */
}]);


