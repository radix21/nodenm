//Suscribirme 
app.controller('Newsletter', ['$scope', '$http', function ($scope, $http) {
        var urlNewsletter = 'http://mindlabs.co/crm/index.php';
        $scope.newsletter_name = '';
        $scope.newsletter_email = '';

        $scope.subscription = function () {
            console.log('subscription');
            var msg = '';


            var request = $http({
                method: "post",
                url: urlNewsletter,
                params: {
                    entryPoint: 'newLead',
                    campaign_id: 'ba077f1a-13b6-724a-1e12-57470f9306ea',
                    first_name: $scope.newsletter_name,
                    email1: $scope.newsletter_email
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            /* Check whether the HTTP Request is successful or not. */
            request.success(function (data) {
                //Limpiamos los campos 
                $scope.newsletter_name = '';
                $scope.newsletter_email = '';

                if (angular.isDefined(data.error) === false) {
                    msg = 'No pudimos suscribirte, intenta nuevamente :).';
                } else {
                    if (data.error === 0) {
                        msg = 'Gracias por suscribirte a nuestro boletín.';
                    } else {
                        msg = 'No pudimos suscribirte, intenta nuevamente :).';
                    }
                }
                
                alert(msg);
            });

        };
    }]);