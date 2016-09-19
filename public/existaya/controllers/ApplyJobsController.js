// Get the complete list of Jobs offers
app.controller('ApplyJobsController', ['$scope', '$http', '$location', 'SessionServices', 'fileUpload', function ($scope, $http, $location, SessionServices, fileUpload) {
        //Inicializamos variables 
        $scope.checkLogin = false;
        $scope.user_id = '';
        $scope.session = '';
        $scope.token = '';

//----------------------------------------------------------------------------->
        /**
         * Función para consultar si el usuario esta logueado
         */
        $scope.checkedkLogin = function () {
            SessionServices.is_authenticated().then(function (response) {
                $scope.checkLogin = response.logged;

                console.log(response);

                if ($scope.checkLogin === false) {
                    $('#js-ingreso').modal({show: true});
                } else {
                    $('#ApplyJobsController').modal({show: true});
                    $scope.user_id = response.data.user.info.id;

                    //Cargamos la session
                    $scope.getSession();

                }
            });
        }
//----------------------------------------------------------------------------->
        /**
         * Función para obtener la session
         * @returns {undefined}
         */
        $scope.getSession = function () {
            //Get Token
            SessionServices.getMuToken().then(function (response2) {
                $scope.token = response2.mutoken;

                //Get Session
                SessionServices.getSession($scope.user_id, $scope.token).then(function (response3) {
                    console.log('response2: ' + response3);
                    if (response3 == 'false' || response3 == false) {
                        console.log('No se pudo iniciar Session.');
                        return false;
                    } else {
                        $scope.session = response3.session_id;
                    }
                });
            });
        }
//----------------------------------------------------------------------------->
        /**
         * Función para subir la postulación
         * @returns {undefined}
         */
        $scope.uploadFile = function () {
            var file = $scope.myFile;
            var params = {};


            params['kme_usr_id'] = $scope.user_id;
            params['session'] = $scope.session;
            params['oferta_empleo_id'] = $scope.$parent.oferta_empleo_id;


            console.log('file is ');
            console.dir(params);



            var uploadUrl = app.urlRest;
            fileUpload.uploadFileToUrl(file, params, uploadUrl);
        };
//----------------------------------------------------------------------------->

        /**
         * 
         * @returns {undefined}
         */
        function init() {

        }
//----------------------------------------------------------------------------->
        //Inicializamos variables
        init();
//----------------------------------------------------------------------------->
    }]);

//----------------------------------------------------------------------------->
app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);
//----------------------------------------------------------------------------->
app.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (file, params, uploadUrl) {



            /*if (Object.keys(params).length > 0) {
             angular.forEach(params, function (value, index) {
             fd.append(index, value);
             });
             }*/

            arguments = {
                'session': params['session'],
                'oferta_id': params['oferta_empleo_id'],
                'usuario_id': params['kme_usr_id'],
            };

            var params2 = {
                'method': 'ofertaPostularse',
                'input_type': 'JSON',
                'response_type': 'JSON',
                'rest_data': arguments
            };





            //--
            $http({
                method: 'POST',
                url: uploadUrl,
                headers: {'Content-Type': undefined},
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("file", file);
                    return formData;
                },
                data: params2,
                params: params2
            }).
                    success(function (data, status, headers, config) {
                        alert("success!");
                    }).
                    error(function (data, status, headers, config) {
                        alert("failed!");
                    });



        }
    }]);
//----------------------------------------------------------------------------->