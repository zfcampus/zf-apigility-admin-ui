/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteField', DeleteField);

  DeleteField.$inject = [ '$modalInstance', '$stateParams', 'api', 'field', 'fields', 'type' ];

  function DeleteField($modalInstance, $stateParams, api, field, fields, type) {
    /* jshint validthis:true */
    var vm = this;
    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;

    vm.cancel = $modalInstance.dismiss;
    vm.field = field;

    vm.ok = function() {
      var newFields = angular.copy(fields);
      for(var i = 0; i < newFields.length; i++) {
        if (newFields[i].name === vm.field.name) {
          newFields.splice(i, 1);
          break;
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
