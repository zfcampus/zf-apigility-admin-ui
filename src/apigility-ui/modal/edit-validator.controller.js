/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('EditValidator', EditValidator);

  EditValidator.$inject = [ '$modalInstance', '$modal', '$stateParams', 'field', 'validator', 'api', 'fields', 'type', 'SidebarService' ];

  function EditValidator($modalInstance, $modal, $stateParams, field, validator, api, fields, type, SidebarService) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.restName = $stateParams.rest;
    vm.field = field;
    vm.options = {};
    vm.optionNames = [];
    vm.disabled = !SidebarService.isLastVersion(vm.version, vm.apiName);

    vm.cancel = $modalInstance.dismiss;

    vm.validator = angular.copy(validator);
    // If options is empty array change it in empty object
    if (vm.validator.options.length === 0) {
      vm.validator.options = {};
    }

    // Get the list of all validators
    api.getValidators(function(result){
      vm.validators = result;
      vm.options = result[vm.validator.name];
      vm.optionNames = [];
      for (var property in vm.options) {
        vm.optionNames.push(property);
      }
    });

    vm.addOption = function() {
      if (!vm.validator.options.hasOwnProperty(vm.option.name)) {
        vm.validator.options[vm.option.name] = vm.option.value;
      }
    };

    vm.deleteOption = function(option) {
      if (vm.validator.options.hasOwnProperty(option)) {
        delete vm.validator.options[option];
      }
    };

    vm.deleteValidatorModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-validator.html',
        controller: 'DeleteValidator',
        controllerAs: 'vm',
        resolve : {
          validator : function() {
            return validator;
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

    function updateValidator(fields, field, validator) {
      for(var i = 0; i < fields.length; i++) {
        if (fields[i].name === field.name) {
          for(var j = 0; j < fields[i].validators.length; j++) {
            if (fields[i].validators[j].name === validator.name) {
              fields[i].validators[j] = validator;
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
      updateValidator(newFields, field, vm.validator);
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
