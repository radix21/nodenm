var app = angular.module('kmelx', ['ngMaterial','ngMessages','lfNgMdFileInput','ngAnimate']);

app.config(function($mdThemingProvider) {

  var kmePalette = $mdThemingProvider.extendPalette('grey', {
    '100': 'E0E0E0'
  });

  $mdThemingProvider.definePalette('kmePalette', kmePalette);

  $mdThemingProvider.theme('default')
    .primaryPalette('kmePalette', {
      'default': '500', 
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': '900'
    })
    .accentPalette('teal', {
      'default': '500',
      'hue-1': '200',
      'hue-2': 'A400',
      'hue-3': 'A700'
    })
    .warnPalette('red');
});
