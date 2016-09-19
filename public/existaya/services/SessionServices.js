/**
 * Servicio para obtener los empleos 
 */
// URL to CRM Provider
app.urlRest = 'http://crm.marketinguniversity.co/custom/service/v4_1_custom/rest.php';
app.factory('SessionServices', ['$http', function ($http)
    {
        var obj = {
//----------------------------------------------------------------------------->
            /**
             * Función para obtener los datos de un usuario Logueado en MKU
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
             * Función para obtener el token del usuario logueado MKU
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
            },
//----------------------------------------------------------------------------->
            /**
             * Función para obtener la sessión de un usuario logueado en MKU->CRM
             */
            getSession: function (kme_usr_id, token) {
                //Parametros
                var params = {
                    'method': 'mku_login',
                    'input_type': 'JSON',
                    'response_type': 'JSON',
                    'rest_data': {
                        'kme_usr_id': kme_usr_id,
                        'token': token,
                    }
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
            session: function (kme_usr_id) {
                var token = '';
                var session = '';

                //Get Token
                return obj.getMuToken().then(function (response2) {
                    token = response2.mutoken;
                    console.log('token: ' + token);

                    obj.getSession(kme_usr_id, token).then(function (response3) {
                        return response3;
                    });
                });
            }
//----------------------------------------------------------------------------->
        };

        return obj;

    }]);



