/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.api-module')
    .controller('ApiModule', ApiModule);

  ApiModule.$inject = [ 'api', '$modal', '$stateParams', '$rootScope'];

  function ApiModule(api, $modal, $stateParams, $rootScope) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;

    api.getRestList(vm.apiName, vm.version, function(result){
      vm.rest = result;
    });

    api.getRpcList(vm.apiName, vm.version, function(result){
      vm.rpc = result;
    });

    vm.newVersionModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/api-module/new-version.modal.html',
        controller: 'NewVersionModal',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    }

    vm.deleteApiModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/api-module/delete-api.modal.html',
        controller: 'DeleteApiModal',
        controllerAs: 'vm'
      });
      
      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    }
  }
})();
