/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteValidator', DeleteValidator);

  DeleteValidator.$inject = [ '$modalInstance', '$stateParams', 'validator', 'field', 'api', 'fields', 'type' ];

  function DeleteValidator($modalInstance, $stateParams, validator, field, api, fields, type) {
    /* jshint validthis:true */
    var vm = this;
    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.validator = validator;

    vm.cancel = $modalInstance.dismiss;

    function deleteValidator(fields, field, validator){
      for(var i = 0; i < fields.length; i++) {
        if (fields[i].name === field.name) {
          for (var j = 0; j < fields[i].validators.length; j++) {
            if (fields[i].validators[j].name === validator.name) {
              fields[i].validators.splice(j, 1);
              break;
            }
          }
          break;
        }
      }
    }

    vm.ok = function() {
      vm.loading = true;
      var newFields = angular.copy(fields);
      deleteValidator(newFields, field, validator);
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
