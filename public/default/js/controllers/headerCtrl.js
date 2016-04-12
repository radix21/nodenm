/* Helpers */
function $jq(elem){
	return angular.element(elem); 
}
/* Controllers */
app.controller('confiHeader', ['$scope', '$rootScope', '$mdToast', '$document', '$mdDialog',function ($scope, $rootScope,$mdToast,$document,$mdDialog){	
	$scope.textOrganization = 'Crear Organización';
	$rootScope.btnClose = false;
	$scope.colorText = '#A0A4A5';
	$scope.optionColor = [
							{
								color:'Rojo',
								hex:'#F44336'
							},
							{
								color:'Rosa',
								hex:'#E91E63'
							},
							{
								color:'Purpura',
								hex:'#9C27B0'
							},
							{
								color:'Purpura ozcuro',
								hex:'#673AB7'
							},
							{
								color:'Indigo',
								hex:'#3F51B5'
							},
							{
								color:'Azul',
								hex:'#2196F3'
							},
							{
								color:'Cyan',
								hex:'#00BCD4'
							},
							{
								color:'Teal',
								hex:'#009688'
							},
							{
								color:'Verde',
								hex:'#4CAF50'
							},
							{
								color:'Verde Claro',
								hex:'#8BC34A'
							},
							{
								color:'Lima',
								hex:'#CDDC39'
							},
							{
								color:'Amarillo',
								hex:'#FFEB3B'
							},
							{
								color:'Naranja',
								hex:'#FF9800'
							},
							{
								color:'Cafe',
								hex:'#795548'
							},
							{
								color:'Gris',
								hex:'#9E9E9E'
							},
							{
								color:'Azul Gris',
								hex:'#607D8B'
							},
							{
								color:'Negro',
								hex:'#000000'
							},
							{
								color:'Blanco',
								hex:'#FFFFFF'
							},

						];

	$scope.changeBanner = function(bgBanner){
		$rootScope.bannerColor = bgBanner;
		$rootScope.removeColorBg = true;
	}

	$scope.changeBgLogo = function(bgLogo){
		$rootScope.backLogo = bgLogo;
	}

	$scope.changeName = function(name){
		$rootScope.nameAcademy = name;
	}

	$scope.changeColorText = function(color){
		$rootScope.nameColor = color;
	}

	
	$scope.$watch('fileLogo.length',function(newVal,oldVal){
		try{
			$rootScope.logoUrl = $scope.fileLogo[0].lfDataUrl; 
		}catch(err){

		}
	});
	

	$scope.save = function(text,cbanner,clogo){

		$scope.textOrganization = 'Editar Organización';

		$rootScope.nameAcademy = text; 
		$rootScope.bannerColor = cbanner;

		if(clogo == undefined){
			$rootScope.backLogo = '#FFFFFF';
		}else{
			$rootScope.backLogo = clogo;
		}
	}

	$scope.resetName = function(text){
		try{
			var textFinal = text.replace(/ /g, '_'); 
			return textFinal.toLowerCase();
		}catch(err){

		}
	}

	$scope.openToast = function(elemt) {
		var parentAlert = angular.element(document.getElementById(elemt));

		$mdToast.show({
			template: '<md-toast class="md-toast"><h3>Tu organización se ha creado con éxito</h3><md-button class="md-raised md-accent" style="width:40%;" ng-click="closeToast()">Cerrar</md-button></md-toast>',
			hideDelay: 5000, 
			position: 'bottom right',
			parent: parentAlert, 
			controller  : 'confiHeader'
		});
	};

	$scope.closeToast = function(){
		$mdToast.hide();
	}

	function preview(){
		var body = $jq('body');
		var header = $jq('header');
		body.animate({ scrollTop: 0 }, 600);
		body.prepend('<div class="bannerPreview">');
		header.addClass('headerPreview');
		$rootScope.btnClose = true;
	}

	$scope.previewAll = function(anchor){
		$rootScope.anchor = anchor;
		preview();
	}

	$scope.showCustom = function(event) {
       $mdDialog.show({
          clickOutsideToClose: true,
          scope: $scope,        
          preserveScope: true,           
          templateUrl: '/js/controllers/views/dialogImage.html',
          controller: function DialogController($scope, $mdDialog) {

          	$scope.$watch('fileBanner.length',function(newVal,oldVal){
          		try{
          			$rootScope.bannerUrl = $scope.fileBanner[0].lfDataUrl; 
          			$rootScope.imageCover = true;
          			$rootScope.imageCoverFirst = true;
          			$mdDialog.hide();
          		}catch(err){

          		} 
          	});

          	$scope.Imagepreload = function(x){ 
          		$rootScope.bannerUrl = '/img/bank_images/image' + x + '.jpg';
          		$rootScope.imageCover = true;
          		$rootScope.imageCoverFirst = true;
          		$mdDialog.hide();
          	}

          	$scope.range = function(min, max){
          		var input = []; 
          		for(i = min; i <= max; i++){
          			input.push(i);
          		}
          		return input; 
          	}

             $scope.closeDialog = function() {
                $mdDialog.hide();
             }
          }
       });
    };

    $scope.nameLogoDisable = true;
    $scope.nameCoverDisable = true;
	$scope.changeLogoName = function(data){
		$rootScope.nameLogo = data;
	}

	$scope.changeCoverName = function(data){
		$rootScope.nameCover = data;
	}

	$scope.removeImgBanner = function(){
		$rootScope.bannerUrl = '';
		$rootScope.imageCover = false;
	}

	$scope.removeColorBanner = function($event){
		$rootScope.bannerColor  = '#EEEEEE';
		$rootScope.removeColorBg = false;
		$event.stopPropagation(); 
		$scope.bgBanner = undefined;
	}

}]);

app.controller('header', ['$scope', '$rootScope', '$document', function ($scope, $rootScope,$document) {
	$rootScope.bannerColor  = '#EEEEEE';
	$rootScope.logoUrl = '/img/logoDefault.png';
	$rootScope.backLogo = '#E9E9E9';
	$rootScope.bannerUrl = '';
	$rootScope.nameAcademy = 'Nombre de su Organización';
	$rootScope.nameLogo = true;
	$rootScope.nameCover = true;

	$scope.closePreview = function(){
		$rootScope.btnClose = false;
		var preview = $jq('.bannerPreview');
		var elementAnchor = $jq('.' + $rootScope.anchor);
		preview.remove();
		$document.scrollTop( elementAnchor.offset().top );  
	}
}]);
