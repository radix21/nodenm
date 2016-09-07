app.controller("accountController", ['$scope','$http','$rootScope', "$location", function($scope, $http, $rootScope, $location){
    $scope.reset =  function(){
        if(!$scope.email ){
            sweetAlert("Error", "No ingresaste un correo electronico", "error");

        }else{
        	$http.post("/api/account/resetpasswd/", {
                username: $scope.email,
            }).success(function(response) {
                swal({   title: "Se ha enviado un correo",   text: "revisa tu bandeja de entrada",   type: "success",   showCancelButton: false,    confirmButtonText: "Continuar",   closeOnConfirm: false }, function(){   window.location.assign("/"); });
                
            });
        }
        
    }
    $scope.restart =  function(){
        if(!$scope.password || !$scope.password2 ){
            $scope.alertFields = true;
        }else if($scope.password != $scope.password2 ){
            $scope.alertData = true;
        }else{
            $http.post("/api/account/restartpasswd/", {
                password: $scope.password,
                uid:uid,
                key: key,

            }).success(function(response) {
            	if (response.status == 200){
            	swal({   title: "Cambio de contraseña exitoso",   text: "ingresa con tu nueva contraseña",   type: "success",   showCancelButton: false,    confirmButtonText: "Continuar",   closeOnConfirm: false }, function(){   window.location.assign("/"); });	
            	}else{
            		sweetAlert("No se pudo procesar tu solicitud", "verifica que el enlace no haya expirado", "error");
            	}
                });
        }
        
    }
}]);
