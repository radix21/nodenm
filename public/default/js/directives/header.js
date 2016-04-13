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
			text_cover: '=textCover',
			text_logo: '=textLogo' 
		},
		templateUrl: '/default/js/directives/views/header.html',
		link: function (scope, element, attrs) {
			scope.$watch('name_logo',function(){
				scope.nameLogoShow = scope.name_logo;
			});
			scope.$watch('name_cover',function(){
				scope.nameCoverShow = scope.name_cover;
			});
			scope.$watch('text_cover', function(){
				scope.colorTextCover = scope.text_cover;
			});
			scope.$watch('text_logo', function(){
				scope.colorTexLogo = scope.text_logo;
			});
		}
	};
}]);