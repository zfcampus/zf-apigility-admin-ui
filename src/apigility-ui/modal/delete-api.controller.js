/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteApi', DeleteApi);

  DeleteApi.$inject = [ '$modalInstance', '$stateParams', 'api', '$timeout' ];

  function DeleteApi($modalInstance, $stateParams, api, $timeout) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.cancel = $modalInstance.dismiss;
    vm.recursive = false;

    vm.ok = function() {
      vm.loading = true;
      api.deleteApi(vm.apiName, vm.recursive, function(err, response) {
        if (err) {
          vm.alert = 'Error during the delete of the API';
          vm.loading = false;
          return;
        }
        $timeout(function(){
          vm.loading = false;
          $modalInstance.close(vm.apiName);
        }, 2000);
      });
    }
  }
})();
