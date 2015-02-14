/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteRest', DeleteRest);

  DeleteRest.$inject = [ '$modalInstance', '$stateParams', 'api', '$timeout', 'isDoctrine' ];

  function DeleteRest($modalInstance, $stateParams, api, $timeout, isDoctrine) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.restName = $stateParams.rest;

    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      vm.loading = true;
      api.deleteRest(vm.apiName, vm.version, vm.restName, isDoctrine, vm.recursive, function(err, response) {
        if (err) {
          vm.alert = 'Error during the delete of the service';
          vm.loading = false;
          return;
        }
        $timeout(function(){
          vm.loading = false;
          $modalInstance.close({api: vm.apiName, version: vm.version, service: vm.restName});
        }, 2000);
      });
    }
  }
})();
