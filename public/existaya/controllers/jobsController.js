// URL to CRM Provider
app.urlCrmProvider = 'http://crm.marketinguniversity.co/custom/service/v4_1_custom/rest.php';


// Get the complete list of Jobs offers
app.controller('jobsController', ['$scope', '$http', 'jobsServices', function ($scope, $http, jobsServices) {
        //Inicializamos variables 
        $scope.name = '';
        $scope.ubicacion_c = '';
        $scope.jornada_c = '';
        $scope.featuredJobs = {};
        $scope.jornadaList = {};

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

            if ($scope.salario !== '') {
                filter.salario = $scope.salario;
            }

            if ($scope.jornada_c !== '') {
                filter.jornada_c = $scope.jornada_c;
            }

            //console.log(filter);
            getServices(filter);
        };

        //Carga servicios
        function getServices(filtros) {
            jobsServices.ofertaSearch(filtros).then(function (data) {
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

        //Carga Lista Jornada
        function getJornadaList() {
            jobsServices.getList('jornada_c_list').then(function (response) {
                $scope.jornadaList = response;
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
            getJornadaList();

        }

    }]);
