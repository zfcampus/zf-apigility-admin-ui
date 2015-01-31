/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('AddFilter', AddFilter);

  AddFilter.$inject = [ '$modalInstance', '$stateParams', 'fields', 'field', 'api', 'type' ];

  function AddFilter($modalInstance, $stateParams, fields, field, api, type) {
    /* jshint validthis:true */
    var vm = this;
    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.field = field;

    vm.cancel = $modalInstance.dismiss;
    vm.filter = { name : '', options : {} };

    var fieldFilters = [];
    field.filters.forEach(function(entry){
      fieldFilters.push(entry.name);
    });

    api.getFilters(function(result){
      vm.filters = result;
      // Remove the validators already present in the field
      for (var property in result) {
        if (fieldFilters.indexOf(property) > -1) {
          delete vm.filters[property];
        }
      }
    });

    vm.selectFilter = function() {
      vm.options = vm.filters[vm.filter.name];
    }

    vm.addOption = function() {
      if (!vm.filter.options.hasOwnProperty(vm.option.name)) {
        vm.filter.options[vm.option.name] = vm.option.value;
      }
    }

    vm.deleteOption = function(option) {
      if (vm.filter.options.hasOwnProperty(option)) {
        delete vm.filter.options[option];
      }
    }

    function addFilter(fields, field, filter){
      for(var i = 0; i < fields.length; i++) {
        if (fields[i].name == field.name) {
          fields[i].filters.push(filter);
          break;
        }
      }
    }

    vm.ok = function() {
      vm.loading = true;
      var newFields = angular.copy(fields);
      addFilter(newFields, field, vm.filter);
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
