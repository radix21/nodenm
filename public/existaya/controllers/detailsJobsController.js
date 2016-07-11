// URL to CRM Provider
app.urlCrmProvider = 'http://crm.marketinguniversity.co/custom/service/v4_1_custom/rest.php';

// Get the complete list of Jobs offers
app.controller('detailsJobsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        //Inicializamos variables 
        $scope.detailJob = {};
        $scope.empresa = {};
        var oferta_empleo_id = getOfertaEmpleoId();
        //Obtenemos el id de la oferta 
        console.log(oferta_empleo_id);


        /**
         * Función para obtener la información de una oferta de empleo
         * @returns {Array.id|JSON@call;parse.id|Object.id}
         */
        function getOfertaEmpleo(oferta_empleo_id) {

            var offerData = {
                'session': '',
                oferta_id: oferta_empleo_id,
            };
            //Salario base 1000000
            var salarioM = 0;

            var request = $http({
                method: "post",
                url: app.urlCrmProvider,
                params: {
                    'method': 'ofertaGetById',
                    'input_type': 'JSON',
                    'response_type': 'JSON',
                    'rest_data': offerData

                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            /* Check whether the HTTP Request is successful or not. */
            request.success(function (data) {

                //Si data es falso redireccionamos a lista de empleos
                if (data == false) {
                    redirectJobs();
                }

                if (angular.isDefined(data) === false) {
                    redirectJobs();
                }


                //console.log(data);
                //Calculamos el salario base 1000000
                salarioM = parseInt(data['salario']) / 1000000;
                data['salarioM'] = salarioM;
                $scope.detailJob = data;

                //Consultamos la empresa
                getEmpresa(data['stp_empresas_stp_ofertas_empleo_1stp_empresas_ida']);

            });

        }

        /**
         * Función para obtener los datos de la empresa pasando como parametros 
         * id de la empresa
         * @param {String} empresa_id
         * @returns {undefined}
         */
        function getEmpresa(empresa_id) {
            var offerData = {
                session: '',
                oferta_id: empresa_id,
            };

            var request = $http({
                method: "post",
                url: app.urlCrmProvider,
                params: {
                    'method': 'empresaGetById',
                    'input_type': 'JSON',
                    'response_type': 'JSON',
                    'rest_data': offerData

                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            /* Check whether the HTTP Request is successful or not. */
            request.success(function (data) {

                //Si data es falso redireccionamos a lista de empleos
                if (data == false) {
                    return false;
                }

                if (angular.isDefined(data) === false) {
                    return false;
                }

                $scope.empresa = data;
            });
        }

        /**
         * Función del controlador que permite redireccionar por ancla
         * @param {String} ancla
         * @returns none
         */
        $scope.ancla = function (ancla) {
            document.location.href = ancla;
        };

        /**
         * Función para obtener el id de una oferta_empleo
         * @returns {Array.id|JSON@call;parse.id|Object.id}
         */
        function getOfertaEmpleoId() {
            var resp = QueryStringToJSON();
            if (angular.isDefined(resp.id) === false) {
                redirectJobs();
            }

            return resp.id;
        }

        /**
         * Función para obtener los parametros de la url
         * @returns {Array|Object}
         */
        function QueryStringToJSON() {
            //Dividimos por la primera coincidencia con #/ en la url 
            var param = $location.absUrl().split('#/');

            //Obtenemos la posición 0 del arreglo despues de cortar la cadena
            param = param[0];

            //Cortamos la cadena por la primera coincidencia de ? 
            param = param.split('?');

            //Si no esta definida la posición 1 del arreglo redireccionamos a la 
            //lista de empleos 
            if (angular.isDefined(param[1]) === false) {
                redirectJobs();
            }

            //Obtenemos por separación de & 
            var pairs = param[1].split('&');

            var result = {};
            pairs.forEach(function (pair) {
                pair = pair.split('=');
                result[pair[0]] = decodeURIComponent(pair[1] || '');
            });

            return JSON.parse(JSON.stringify(result));
        }

        /**
         * Función para redireccionar a Jobs
         * @returns {undefined}
         */
        function redirectJobs() {
            window.location.href = '/jobs';
        }

        /**
         * 
         * @returns {undefined}
         */
        function init() {
            getOfertaEmpleo(oferta_empleo_id);
        }

        //Inicializamos variables
        init();
    }]);


