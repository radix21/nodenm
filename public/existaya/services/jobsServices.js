/**
 * Servicio para obtener los empleos 
 */
// URL to CRM Provider
app.urlRest = 'http://crm.marketinguniversity.co/custom/service/v4_1_custom/rest.php';
app.factory('jobsServices', ['$http', '$q', function ($http, $q)
    {
        var obj = {};
        var def = $q.defer();

        /**
         * Función para obtener las ofertas de empleo pasando como parametros 
         * los filtros 
         * @param {object} filtros
         * @returns {$q@call;defer.promise}
         */
        obj.ofertaSearch = function (filtros) {

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
                url: app.urlRest,
                params: {
                    'method': 'ofertaSearch',
                    'input_type': 'JSON',
                    'response_type': 'JSON',
                    'rest_data': offerData
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {
                def.resolve(response.data);
            }, function (response) {
                def.reject('error');
            });

            return def.promise;

        };
//----------------------------------------------------------------------------->
        //Necesario para reset promise 
        obj.loadInitialData = function () {
            // tries to load data and resolve or rejects promise
        };
//----------------------------------------------------------------------------->
        //Al llamar esta funcion limpia el promise para evitar que quede 
        //en cache los datos y tome los nuevos datos de llamados 
        obj.reset = function () {
            def.reject();  // Reject just in case
            def = $q.defer();
            obj.loadInitialData();
        };

//----------------------------------------------------------------------------->
        return obj;

    }]);