/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewField', NewField);

  NewField.$inject = [ '$modalInstance', '$stateParams', 'api', 'fields', 'type'];

  function NewField($modalInstance, $stateParams, api, fields, type) {
    /* jshint validthis:true */
    var vm = this;
    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;

    vm.field = {};
    vm.field.required = true;
    vm.field.validators = [];
    vm.field.filters = [];
    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      if (!vm.field.name) {
        vm.alert = 'The Field name cannot be empty';
        return;
      }
      vm.loading = true;
      var newFields = angular.copy(fields);
      newFields.push(vm.field);
      // remove the type value if empty (required for File Upload)
      for(var i=0; i < newFields.length; i++) {
        if (!newFields[i].type) {
          delete newFields[i].type;
        }
      }
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
