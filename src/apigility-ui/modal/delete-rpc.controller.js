/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteRpc', DeleteRpc);

  DeleteRpc.$inject = [ '$modalInstance', '$stateParams', 'api', '$timeout' ];

  function DeleteRpc($modalInstance, $stateParams, api, $timeout) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.rpcName = $stateParams.rpc;

    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      vm.loading = true;
      api.deleteRpc(vm.apiName, vm.version, vm.rpcName, vm.recursive, function(err, response) {
        if (err) {
          vm.alert = 'Error during the delete of the service';
          vm.loading = false;
          return;
        }
        $timeout(function(){
          vm.loading = false;
          $modalInstance.close(vm.apiName, vm.version, vm.rpcName);
        }, 2000);
      });
    }
  }
})();
