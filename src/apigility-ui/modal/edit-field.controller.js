/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('EditField', EditField);

  EditField.$inject = [ '$modalInstance', '$stateParams', 'api', 'field', 'fields', 'type'];

  function EditField($modalInstance, $stateParams, api, field, fields, type) {
    /* jshint validthis:true */
    var vm = this;
    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.field = field;
    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      vm.loading = true;
      var newFields = angular.copy(fields);
      if (type === 'rest') {
        api.saveRestField(vm.apiName, vm.version, $stateParams.rest, newFields, function(err, response){
          vm.loading = false;
          if (err) {
            vm.alert = response;
            return;
          }
          $modalInstance.close(response);
        });
      } else if (type === 'rpc') {
        api.saveRpcField(vm.apiName, vm.version, $stateParams.rpc, newFields, function(err, response){
          vm.loading = false;
          if (err) {
            vm.alert = response;
            return;
          }
          $modalInstance.close(response);
        });
      }
    }
  }
})();
