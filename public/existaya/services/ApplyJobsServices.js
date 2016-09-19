/**
 * Servicio para obtener los empleos 
 */
// URL to CRM Provider
app.urlRest = 'http://crm.marketinguniversity.co/custom/service/v4_1_custom/rest.php';
app.factory('ApplyJobsServices', ['$http', function ($http)
    {
        var obj = {
//----------------------------------------------------------------------------->
            /**
             * Función para obtener los datos de un usuario Logueado 
             * @param {object} filtros
             * @returns {$q@call;defer.promise}
             */
            is_authenticated: function () {
                return $http({
                    method: "post",
                    url: '/api/account/is_authenticated',
                    params: {},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (response) {
                    return response.data;
                });
            },
//----------------------------------------------------------------------------->
            /**
             * Función para obtener el token del usuario logueado
             * @returns {unresolved}
             */
            getMuToken: function () {
                return $http({
                    method: "get",
                    url: '/api/account/getmutoken/',
                    params: {},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (response) {
                    return response.data;
                });
            }
//----------------------------------------------------------------------------->
        };

        return obj;

    }]);



