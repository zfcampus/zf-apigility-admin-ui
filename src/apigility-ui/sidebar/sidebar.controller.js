/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.sidebar')
    .controller('Sidebar', Sidebar);

  Sidebar.$inject = [ 'api', '$modal', '$rootScope' ];

  function Sidebar(api, $modal, $rootScope){
    /* jshint validthis:true */
    var vm = this;

    vm.version = 1;

    api.getApiList(function(result){
      vm.apis = result;
    });

    vm.toggle = function(scope) {
      scope.toggle();
    };

    vm.newApiModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/sidebar/new-api.modal.html',
        controller: 'NewApiModal',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    }

    vm.newServiceModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/sidebar/new-service.modal.html',
        controller: 'NewServiceModal',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    }

    vm.loadService = function(apiName, serviceName) {

    }
  }
})();
