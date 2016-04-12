app.directive('mdTable', [function(){
	return {
		restrict: 'AE',
		scope: {
			thead: '=',
			tcolumn: '='
		},
		templateUrl: 'js/directives/views/table.html',
		link: function (scope, element, attrs) {
			element.css("padding","0px");
		}
	};
}]);