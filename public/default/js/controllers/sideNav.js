app.controller('ctrlNav', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            angular.element("body").css('overflow','hidden');
            angular.element("body").prepend('<div class="md-backdrop">');
            angular.element(".md-backdrop").hide().fadeIn("slow");
          });
      }, 200);
    }
});

app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          angular.element("body").css('overflow','auto');
          angular.element(".md-backdrop").fadeOut('slow');
          $timeout(function(){
            angular.element(".md-backdrop").remove();
          },2000);
        });
    };
});