app.controller("profile", ["$scope",function($scope){
    $scope.dataUser = data;
    if(sessionStorage.name){
        $scope.dataUser.name = sessionStorage.name;
    }
    if(sessionStorage.avatar){
        $scope.dataUser.avatar = sessionStorage.avatar;
    }
}]);
