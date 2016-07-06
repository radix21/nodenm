// URL to CRM Provider
app.urlCrmProvider = 'http://crm.marketinguniversity.co/custom/service/v4_1_custom/rest.php';


// Get the complete list of Jobs offers
app.controller('jobsController', ['$scope', '$http', function ($scope, $http) {
        //Inicializamos variables 
        $scope.name = '';
        $scope.ubicacion_c = '';

        //Carga Al iniciar Controlador
        getServices({'estado_c': 'Publicado'});


        //Llamamos el requeste buscar Empleaos
        $scope.buscarEmpleos = function () {
            var filter = {};

            if ($scope.name !== '') {
                filter.name = $scope.name;
            }

            if ($scope.ubicacion_c !== '') {
                filter.ubicacion_c = $scope.ubicacion_c;
            }
            console.log(filter);
            getServices(filter);
        };

        //Carga servicios
        function getServices(filtros) {
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
                    });
                }
                console.log(data);
                $scope.jobList = data;
            });
        }

    }]);

// Get the info for Featured Job on main job list. "Ofeta destacada"
app.controller('FeaturedJobController', ['$scope', '$http', function ($scope, $http) {

        var offerData = {
            'session': '',
            'array_filtros': {
                'destacada': 1
            }
        }

        var jctrl = this;

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
            //console.log(data[0].name);
            jctrl.fJinfo = {
                'offer_name': data[0].name,
                'job_position': data[0].poistion, // Este dato no viene en lo que responde la funcion
                'description': data[0].description
            };
        });
    }]);
