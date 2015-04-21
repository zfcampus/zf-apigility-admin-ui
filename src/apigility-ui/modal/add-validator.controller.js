/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('AddValidator', AddValidator);

  AddValidator.$inject = [ '$modalInstance', '$stateParams', 'fields', 'field', 'api', 'type' ];

  function AddValidator($modalInstance, $stateParams, fields, field, api, type) {
    /* jshint validthis:true */
    var vm = this;
    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.field = field;
    vm.validators = {};
    vm.validatorNames = [];
    vm.optionNames = [];

    vm.cancel = $modalInstance.dismiss;
    vm.validator = { name : '', options : {} };

    var fieldValidators = [];
    field.validators.forEach(function(entry){
      fieldValidators.push(entry.name);
    });

    api.getValidators(function(result){
      vm.validators = result;
      // Remove the validators already present in the field
      for (var property in result) {
        if (fieldValidators.indexOf(property) > -1) {
          delete vm.validators[property];
          continue;
        }
        vm.validatorNames.push(property);
      }
    });

    vm.selectValidator = function(item, model) {
      vm.options = vm.validators[item];
      vm.optionNames = [];
      for (var property in vm.options) {
        vm.optionNames.push(property);
      }
    };

    vm.selectOption = function(item, model) {
      vm.option.value = '';
    };

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

    function addValidator(fields, field, validator){
      for(var i = 0; i < fields.length; i++) {
        if (fields[i].name == field.name) {
          fields[i].validators.push(validator);
          break;
        }
      }
    }

    vm.ok = function() {
      vm.loading = true;
      var newFields = angular.copy(fields);
      addValidator(newFields, field, vm.validator);
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
