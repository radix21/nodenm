app.directive('mdHeader', [function(){
	return {
		restrict: 'AE',
		scope: {
			logo: '@',
			banner: '@',
			name: '@',
			banner_color: '@bannerColor',
			bg_logo: '@bgLogo',
			name_logo:'=nameLogo',
			name_cover: '=nameCover',
			color_text: '=colorText' 
		},
		templateUrl: '/js/directives/views/header.html',
		link: function (scope, element, attrs) {
			scope.$watch('name_logo',function(){
				scope.nameLogoShow = scope.name_logo;
			});
			scope.$watch('name_cover',function(){
				scope.nameCoverShow = scope.name_cover;
			});
			scope.$watch('color_text', function(){
				scope.colorTextName = scope.color_text;
			});
		}
	};
}]);