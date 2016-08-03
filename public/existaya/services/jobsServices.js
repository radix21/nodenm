/**
 * Servicio para obtener los empleos 
 */
// URL to CRM Provider
app.urlRest = 'http://crm.marketinguniversity.co/custom/service/v4_1_custom/rest.php';
app.factory('jobsServices', ['$http', function ($http)
    {
        var obj = {
//----------------------------------------------------------------------------->
            /**
             * Función para obtener las ofertas de empleo pasando como parametros 
             * los filtros 
             * @param {object} filtros
             * @returns {$q@call;defer.promise}
             */
            ofertaSearch: function (filtros) {
                //Si no se pasa el filtro estado solo se visualizan los de estado Publicado
                if (angular.isDefined(filtros['estado_c']) === false) {
                    filtros['estado_c'] = 'Publicado';
                }

                var offerData = {
                    'session': '',
                    'array_filtros': filtros
                };

                var params = {
                    'method': 'ofertaSearch',
                    'input_type': 'JSON',
                    'response_type': 'JSON',
                    'rest_data': offerData
                };

                return $http({
                    method: "post",
                    url: app.urlRest,
                    params: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (response) {
                    return response.data;
                });

            },
//----------------------------------------------------------------------------->
            /**
             * Función para cargar listas, pasando como parametro su 
             */
            getList: function (listName) {

                if (listName.length <= 0 || (listName.trim()) === '') {
                    return;
                }

                var offerData = {
                    'listName': listName
                };

                var params = {
                    'method': 'getList',
                    'input_type': 'JSON',
                    'response_type': 'JSON',
                    'rest_data': offerData
                };

                return $http({
                    method: "post",
                    url: app.urlRest,
                    params: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (response) {
                    return response.data;
                });


            },
//----------------------------------------------------------------------------->
        };

        return obj;

    }]);
