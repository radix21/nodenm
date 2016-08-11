app.controller("footer", function($scope){

    if(sessionStorage.dataUser){  
        $scope.subscription = false;
    }else{
        $scope.subscription = true;
    }
});
app.controller("navbarController", ['$scope','$http','$rootScope', "$location", function($scope, $http, $rootScope, $location){

    $rootScope.showMenu =false;
    $rootScope.$watch("dataUser", function(){
        $scope.user_avatar = $rootScope.dataUser != null ? $rootScope.dataUser.photo : "";
    })
    $scope.seeMenu = false;
    $scope.toggleMenuNavbar = function(){

        $scope.seeMenu = !$scope.seeMenu;


    }
    $scope.sessionName = sessionStorage.name;
    $scope.sessionAvatar = sessionStorage.avatar;
    $rootScope.$watch("dataUser", function(){

        if($rootScope.dataUser == null){
            $rootScope.authenticated = false;
            $scope.authenticated_navbar = false;
        }else{
            $rootScope.authenticated = true;
            $scope.authenticated_navbar = true;
            $rootScope.first_name = $rootScope.dataUser.name;
            $rootScope.last_name = $rootScope.dataUser.lastname;
            if(sessionStorage.locate != undefined){
                $location.path(sessionStorage.locate);
                sessionStorage.removeItem("locate");
                sessionStorage.removeItem("location_state");
            }else{
                $location.path("/profile");
            }
        }
    })
    if(sessionStorage.dataUser != undefined){
        $rootScope.dataUser = JSON.parse(sessionStorage.dataUser);
    }
    $scope.showCourses = function(){
        $rootScope.display_menu = 1;
        courseView = document.querySelector("#courseView");
        certificationsView = document.querySelector("#certificationsView");
        toolsView = document.querySelector("#toolsView");
        courseView.classList.add("active");
        certificationsView.classList.remove("active");
        toolsView.classList.remove("active");
        $location.path("/profile");
    }
    $scope.showTools = function(){
        $rootScope.display_menu = 3;
        courseView = document.querySelector("#courseView");
        certificationsView = document.querySelector("#certificationsView");
        toolsView = document.querySelector("#toolsView");
        courseView.classList.remove("active");
        certificationsView.classList.remove("active");
        toolsView.classList.add("active");

        $location.path("/profile");
    }
    $scope.showCertifications = function(){

        $rootScope.display_menu = 2;
        courseView = document.querySelector("#courseView");
        certificationsView = document.querySelector("#certificationsView");
        toolsView = document.querySelector("#toolsView");
        courseView.classList.remove("active");
        certificationsView.classList.add("active");
        toolsView.classList.remove("active");
        $location.path("/profile");
    }

    $scope.menuOpen = false;
    $scope.logout = function(){
        $http.jsonp(config.SERVICE_SERVER+"/api/json_logout/?callback=JSON_CALLBACK").success(function(response){

            $rootScope.dataUser = undefined;
            sessionStorage.clear(); 
        });
    }

    $scope.activeMenu = function(event){
        $(event.target).parent().siblings().removeClass("active");
        $(event.target).parent().addClass("active");

    }

    $rootScope.displayMenu_0 = true;
    $rootScope.displayMenu_1 = false;
    $rootScope.displayMenu_2 = false;

    $scope.menuActive_0 = 'active';
    $scope.menuActive_1 = '';
    $scope.menuActive_2 = '';

    $scope.changeItem = function(index){
        switch(index) {
            case 0: 
                $rootScope.displayMenu_0 = true; 
                $rootScope.displayMenu_1 = false; 
                $rootScope.displayMenu_2 = false;
                $scope.menuActive_0 = 'active';
                $scope.menuActive_1 = ''; 
                $scope.menuActive_2 = '';
                break;
            case 1:
                $rootScope.displayMenu_0 = false; 
                $rootScope.displayMenu_1 = true; 
                $rootScope.displayMenu_2 = false;
                $scope.menuActive_0 = '';
                $scope.menuActive_1 = 'active'; 
                $scope.menuActive_2 = '';
                break;
            case 2:
                $rootScope.displayMenu_0 = false; 
                $rootScope.displayMenu_1 = false; 
                $rootScope.displayMenu_2 = true;
                $scope.menuActive_0 = '';
                $scope.menuActive_1 = '';
                $scope.menuActive_2 = 'active';
                break;    
        }
    }
}]);
app.controller("loginController", ["auth","$scope","$http","$rootScope", "$location", function(auth, $scope, $http, $rootScope, $location){
    $rootScope.$watch("dataUser", function(){
        if($rootScope.dataUser == null){
            $rootScope.authenticated = false;
            $scope.authenticated = false;
        }else{
            $rootScope.authenticated = true;
            $scope.authenticated_navbar = true;
            $rootScope.first_name = $rootScope.dataUser.name;
            $rootScope.last_name = $rootScope.dataUser.lastname;
        }
    })
    if(sessionStorage.dataUser != undefined){
        $rootScope.dataUser = JSON.parse(sessionStorage.dataUser);
    }

    $scope.signIn = function(){
         if(!$scope._username || !$scope._password){
            $scope.alertFields = true;
        }else{
            auth.ajax($http, $scope, $scope._username, $scope._password)
        }
 
    }
    $scope.singUp =  function(){
        if(!$scope.username || !$scope.password || !$scope.email){
            $scope.alertFields = true;
        }else{
            auth.register($http, $scope.username, $scope.password, $scope.email).success(function(response){
                if(response.status == 'ok'){
                    console.log(true); 
                    location.href = "profile"; 
                }else{
                    $scope.showError = true;
                    $scope.message =  response.message;

                }
            })
        }
        
    }

    // URL Constant
    jsonData = config;

    $scope.FBLogin = function (register) {
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                var access_token =   FB.getAuthResponse()['accessToken'];
                $scope.Waiting=true;
                FB.api('/me?fields=name,email,picture', function (response) {
                    arrayname=response.name.split(" ");
                    name=arrayname[0]+" "+arrayname[1];
                    sessionStorage.name = name;
                    sessionStorage.avatar = "https://graph.facebook.com/"+response.id+"/picture?width=9999";
                    
                    username=response.email;
                    username=username.replace("@","");
                    username=username.replace(".","");
                    /**
                    $http.post("/api/account/uploadavatar/", {
                        username: username,
                        url: sessionStorage.avatar
                    }).success(function(response) {
                        console.log(response);
                    });
                    */
                    email = response.email;
                    auth.exists($http, username).success(function(response){
                        if(response.status == "ok" && response.exists){
                            password = email+username;
                            auth.ajax($http, $scope, username, password, email);
                            
                        }else{
                            password = email+username;
                            auth.register($http, username, password, email).success(function(response){
                                if(response.status == "ok"){
                                    location.href = "/profile";    
                                }
                            })
                        }
                    })

                      
                });
            }
            else {
                FB.login(function (response) {
                    if (response.authResponse) {
                        var access_token =   FB.getAuthResponse()['accessToken'];
                        FB.api('/me?fields=name,email, picture', function (response) {
                            arrayname=response.name.split(" ");
                            name=arrayname[0]+" "+arrayname[1];
                            sessionStorage.name = name;

                            sessionStorage.avatar = "https://graph.facebook.com/"+response.id+"/picture?width=9999";;
                            
                            username=response.email;
                            username=username.replace("@","");
                            username=username.replace(".","");
                            email=response.email;

                            $http.post("/api/account/uploadavatar/", {
                                username: username,
                                url: sessionStorage.avatar
                            }).success(function(response) {
                                console.log(response);
                            });
                            auth.exists($http, username).success(function(response){
                                if(response.status == "ok" && response.exists){
                                    password = email+username;
                                    auth.ajax($http, $scope, username, password, email);
                                }else{
                                    password = email+username;
                                    auth.register($http, username, password, email).success(function(response){
                                        if(response.status == "ok"){
                                            location.href = "/profile";    
                                        } 
                                    })
                                }
                            })


                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                },{scope: 'email'});
            }
        });
    }

    $scope.createAccount = function(){
        // Fields
        var userNameNew = $scope.userNameNew,
            userPasswordNew = $scope.userPasswordNew,
            userEmail = $scope.userEmail;

        // ajax for create account
        auth.ajax($http, $scope, userNameNew, userPasswordNew,userEmail);
    }
}]);

