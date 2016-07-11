// URL to CRM Provider
app.urlCrmProvider = 'http://crm.marketinguniversity.co/custom/service/v4_1_custom/rest.php';


// Get the complete list of Jobs offers
app.controller('jobsController', ['$scope', '$http', function ($scope, $http) {
        //Inicializamos variables 
        $scope.name = '';
        $scope.ubicacion_c = '';
        $scope.featuredJobs = {};

        //Carga Al iniciar Controlador
        init();


        //Llamamos el requeste buscar Empleaos
        $scope.buscarEmpleos = function () {
            //console.log('buscarEmpleos start');
            var filter = {};

            if ($scope.name !== '') {
                filter.name = $scope.name;
            }

            if ($scope.ubicacion_c !== '') {
                filter.ubicacion_c = $scope.ubicacion_c;
            }
            //console.log(filter);
            getServices(filter);
        };

        //Carga servicios
        function getServices(filtros) {

            //Si no se pasa el filtro estado solo se visualizan los de estado Publicado
            if (angular.isDefined(filtros['estado_c']) === false) {
                filtros['estado_c'] = 'Publicado';
            }

            var offerData = {
                'session': '',
                'array_filtros': filtros
            };

            var request = $http({
                method: "post",
                url: app.urlCrmProvider,
                params: {
                    'method': 'ofertaSearch',
                    'input_type': 'JSON',
                    'response_type': 'JSON',
                    'rest_data': offerData
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            /* Check whether the HTTP Request is successful or not. */
            request.success(function (data) {
                var color = ['naranja', 'marina', 'rojo', 'verde'];
                //Establece colores 
                if (Object.keys(data).length > 0) {
                    angular.forEach(data, function (value, index) {
                        data[index]['color'] = color[index % 4];

                        //Establecemos logo si no tiene nada 
                    });
                }

                //console.log(data);
                $scope.jobList = data;
            });
        }

        /*
         * Función para obtener las ofertas destacas en estado Publicado,
         * la obtiene aleatoriamente
         * @returns {undefined}
         */
        function getFeaturedJobs() {

            var offerData = {
                'session': '',
                'array_filtros': {
                    destacada: 1,
                    estado_c: 'Publicado',
                    order_rand: true,
                    limit: 1,
                }
            };

            var request = $http({
                method: "post",
                url: app.urlCrmProvider,
                params: {
                    'method': 'ofertaSearch',
                    'input_type': 'JSON',
                    'response_type': 'JSON',
                    'rest_data': offerData
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            /* Check whether the HTTP Request is successful or not. */
            request.success(function (data) {
                //console.log(data);
                $scope.featuredJobs = data;
            });
        }

        /**
         * Metodo para registrar las funciones que se van a cargar al iniciar el controlador
         * @returns {undefined}
         */
        function init() {
            getServices({'estado_c': 'Publicado'});
            getFeaturedJobs();
        }

    }]);
