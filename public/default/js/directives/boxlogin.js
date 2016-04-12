app.directive('boxLogin', [ '$http', function($http){
	return {
		restrict: 'AE',
		scope: {

		},
		templateUrl: 'default/js/directives/views/boxLogin.html',			
		link: function (scope, element, attrs) {

			if(Object.keys(attrs.$attr).length != undefined && Object.keys(attrs.$attr).length > 0){
				scope.default_field = false;
			}else{
				scope.default_field = true;
			}

			scope.log_in = 'logIn' in attrs;

			scope.fieldsSingup = [

					{
						// default field  object firts
						field: 'nameUser',
						fieldmodel: '',
						text:  'Ingresa tu usuario',
						type:  'text', 
						icon:  'account_circle',
						value: ('fieldUsername' in attrs) || scope.default_field
					},
					{
						field: 'emailUser',
						fieldmodel: '',
						text:  'Ingresa tu email',
						icon:  'mail',
						type:  'email', 
						value: 'fieldEmail' in attrs
					},
					{
						field: 'id',
						fieldmodel: '',
						text:  'Ingresa tu numero de identificación',
						type:  'number', 
						icon:  'assignment_ind',
						value: 'fieldId' in attrs
					},
					{
						field: 'pin',
						fieldmodel: '',
						text:  'Ingresa un pin',
						type:  'text', 
						icon:  'redeem',
						value: 'fieldPin' in attrs
					}		
			];

			scope.fieldsLogIn = [

					{
						field: 'user',
						text:  'Ingresa un nombre de usuario',
						type:  'text'
					},
					{
						field: 'name',
						text:  'Ingresa tu nombre completo',
						type:  'text'
					},
					{
						field: 'lastname',
						text:  'Ingresa tus apellidos',
						type:  'text'
					},
					{
						field: 'email',
						text:  'Asocia un correo electronico',
						type:  'email'
					},
					{
						field: 'password',
						text:  'Ingresa una contraseña',
						type:  'password'
					},
					{
						field: 'passwordConfirm',
						text:  'Confirma tu contraseña',
						type:  'password'
					}
					
			];


			scope.socialAttrs = 'facebook' in attrs || 'twitter' in attrs || 'googleplus' in attrs;

			scope.socialNetwork = [

					{
						field: 'facebook',
						value: 'facebook' in attrs
					},
					{
						field: 'twitter',
						value: 'twitter' in attrs
					},
					{
						field: 'googleplus',
						value: 'googleplus' in attrs
					}
					
			];
			scope.rememberMe = false;
			scope.alertError = false;

			scope.field = "";
			scope.password = "";

			scope.btnsingUp = function(){
				angular.element('.containerBoxLogin').removeClass('animated shake');
				var inpusts = angular.element(".inputdata");
				var user_name = null;
	
				angular.forEach(inpusts, function(value,key){
					var nameinput = angular.element(value).attr("name");
					var valinput  = angular.element(value).val();

					if(inpusts.length <= 1){
						switch (nameinput) {
							case 'nameUser': 
								user_name = valinput; 
								break;
							case 'emailUser': 
								user_name = valinput;
								break; 
							case 'id': 
								user_name = valinput;
								break;
							case 'pin': 
								user_name = valinput;
								break; 
						}
					}
	
				});

				var loginPost = $http.post( location.protocol + '//' + location.host + '/api/account/login',{username: user_name, password: scope.password });
				loginPost.then(function(response){
					scope.alertError = false;
					console.log(response);
				}, function(response){
					scope.alertError = true; 
					angular.element('.containerBoxLogin').addClass('animated shake');
				});
			}
		}
	};
}]);