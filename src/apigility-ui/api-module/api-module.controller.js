/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility')
    .controller('ApiModule', ApiModule);

  ApiModule.$inject = [ 'api', '$modal', '$state', '$stateParams', '$rootScope', 'Apis' ];

  function ApiModule(api, $modal, $state, $stateParams, $rootScope, Apis) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.loading = false;

    api.getRestList(vm.apiName, vm.version, function(result){
      vm.rest = result;
    });

    api.getRpcList(vm.apiName, vm.version, function(result){
      vm.rpc = result;
    });

    vm.newVersionModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-version.html',
        controller: 'NewVersion',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function(response) {

      });
    }

    vm.deleteApiModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-api.html',
        controller: 'DeleteApi',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function(apiName) {
        Apis.removeApi(apiName);
        $state.go('ag', null, {reload: true});
      });
    }
  }
})();
