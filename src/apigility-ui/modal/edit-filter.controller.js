/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('EditFilter', EditFilter);

  EditFilter.$inject = [ '$modalInstance', '$modal', '$stateParams', 'fields', 'field', 'filter', 'api', 'type', 'SidebarService' ];

  function EditFilter($modalInstance, $modal, $stateParams, fields, field, filter, api, type, SidebarService) {
    /* jshint validthis:true */
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.field = field;
    vm.options = {};
    vm.optionNames = [];
    vm.disabled = !SidebarService.isLastVersion(vm.version, vm.apiName);

    vm.cancel = $modalInstance.dismiss;

    vm.filter = angular.copy(filter);
    // If options is empty array change it in empty object
    if (vm.filter.options.length === 0) {
      vm.filter.options = {};
    }

    // Get the list of all validators
    api.getFilters(function(result){
      vm.filters = result;
      vm.options = result[vm.filter.name];
      vm.optionNames = [];
      for (var property in vm.options) {
        vm.optionNames.push(property);
      }
    });

    vm.addOption = function() {
      if (!vm.filter.options.hasOwnProperty(vm.option.name)) {
        vm.filter.options[vm.option.name] = vm.option.value;
      }
    };

    vm.deleteOption = function(option) {
      if (vm.filter.options.hasOwnProperty(option)) {
        delete vm.filter.options[option];
      }
    };

    vm.deleteFilterModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-filter.html',
        controller: 'DeleteFilter',
        controllerAs: 'vm',
        resolve : {
          filter : function() {
            return filter;
          },
          field : function() {
            return field;
          },
          fields : function() {
            return fields;
          },
          type : function() {
            return type;
          }
        }
      });

      modalInstance.result.then(function (response) {
        $modalInstance.close(response);
      });
    };

    function updateFilter(fields, field, filter) {
      for(var i = 0; i < fields.length; i++) {
        if (fields[i].name === field.name) {
          for(var j = 0; j < fields[i].filters.length; j++) {
            if (fields[i].filters[j].name === filter.name) {
              fields[i].filters[j] = filter;
              break;
            }
          }
          break;
        }
      }
    }

    vm.ok = function() {
      var newFields = angular.copy(fields);
      updateFilter(newFields, field, vm.filter);
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
    };
  }
})();
