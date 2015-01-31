/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteFilter', DeleteFilter);

  DeleteFilter.$inject = [ '$modalInstance', '$stateParams', 'filter', 'field', 'api', 'fields', 'type' ];

  function DeleteFilter($modalInstance, $stateParams, filter, field, api, fields, type) {
    /* jshint validthis:true */
    var vm = this;
    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.filter = filter;

    vm.cancel = $modalInstance.dismiss;

    function deleteFilter(fields, field, filter){
      for(var i = 0; i < fields.length; i++) {
        if (fields[i].name === field.name) {
          for (var j = 0; j < fields[i].filters.length; j++) {
            if (fields[i].filters[j].name === filter.name) {
              fields[i].filters.splice(j, 1);
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
      deleteFilter(newFields, field, filter);
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
