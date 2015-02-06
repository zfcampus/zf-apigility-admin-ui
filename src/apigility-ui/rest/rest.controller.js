/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.rest')
    .controller('Rest', Rest);

  Rest.$inject = [ 'api', '$modal', '$stateParams', '$rootScope', 'Apis', '$state', '$scope'];

  function Rest(api, $modal, $stateParams, $rootScope, Apis, $state, $scope) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.restName = $stateParams.rest;
    vm.httpMethods = [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    vm.changed = [false, false, false, false];
    vm.tags = {
      accept_whitelist : [],
      content_type_whitelist : []
    };

    function initGeneral() {
      api.getHydrators(function(result){
        vm.hydrators = result;
      });

      api.getDatabase(function(err, response){
        vm.db = response;
      });

      api.getRest(vm.apiName, vm.version, vm.restName, function(result){
        vm.rest = result;
        vm.rest.accept_whitelist.forEach(function(entry){
          vm.tags.accept_whitelist.push({ text : entry });
        });
        vm.rest.content_type_whitelist.forEach(function(entry){
          vm.tags.content_type_whitelist.push({ text : entry });
        });
        if (vm.rest.hasOwnProperty('table_name')) {
          for (var i = 0; i < vm.db.db_adapter.length; i++) {
            if (vm.db.db_adapter[i].adapter_name == vm.rest.adapter_name) {
              vm.adapter = vm.db.db_adapter[i];
              break;
            }
          }
        }
      });

      api.getContentNegotiation(function(result){
        vm.content_negotiation = result;
        for (var i = 0; i < result.length; i++) {
          if (vm.rest.selector.content_name === result[i].content_name) {
            vm.rest.selector = result[i];
            break;
          }
        }
      });
    }

    function initAuthorization() {
      api.getAuthorizationRest(vm.apiName, vm.version, vm.restName, function(err, result){
        if (err) {
          console.log('Error getting the authorization data');
          return;
        }
        vm.auth = result;
      });
    }

    initGeneral();
    initAuthorization();

    vm.change = function(tab) {
      vm.changed[parseInt(tab)] = true;
    }

    vm.saveGeneral = function() {
      if (!vm.changed[0]) {
        return;
      }
      vm.loading = true;
      if (vm.adapter) {
        vm.rest.adapter_name = vm.adapter.adapter_name;
      }
      api.updateGeneralRest(vm.apiName, vm.version, vm.restName, vm.rest, function(err, result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
        vm.changed[0] = false;
      });
    };

    vm.resetGeneral = function() {
      if (vm.changed[0]) {
        initGeneral();
        vm.changed[0] = false;
      }
    };

    vm.saveContentNegotiation = function() {
      if (!vm.changed[1]) {
        return;
      }
      vm.loading = true;
      vm.rest.accept_whitelist = vm.tags.accept_whitelist.map(api.mapTagInput);
      vm.rest.content_type_whitelist = vm.tags.content_type_whitelist.map(api.mapTagInput);
      api.updateContentNegotiationRest(vm.apiName, vm.version, vm.restName, vm.rest, function(err, result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
        vm.changed[1] = false;
      });
    };

    vm.resetContentNegotiation = function() {
      if (vm.changed[1]) {
        initGeneral();
        vm.changed[1] = false;
      }
    };

    vm.saveAuthorization = function() {
      if (!vm.changed[2]) {
        return;
      }
      vm.loading = true;
      api.saveAuthorizationRest(vm.apiName, vm.version, vm.restName, vm.auth, function(err, result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
        vm.changed[2] = false;
      });
    };

    vm.resetAuthorization = function() {
      if (vm.changed[2]) {
        initAuthorization();
        vm.changed[2] = false;
      }
    };

    vm.saveDocumentation = function() {
      if (!vm.changed[3]) {
        return;
      }
      api.saveRestDoc(vm.apiName, vm.version, vm.restName, vm.rest.documentation, function(err,result){
        vm.loading = false;
        if (err) {
          error = true;
          vm.alert = result;
          return;
        }
        vm.changed = false;
      });
    };

    vm.resetDocumentation = function() {
      if (vm.changed[3]) {
        initGeneral();
        vm.changed[3] = false;
      }
    };

    vm.deleteRestModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-rest.html',
        controller: 'DeleteRest',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (api, version, service) {
        Apis.removeRestService(api, service);
        $state.go('ag.apimodule', {api: api, ver: version}, {reload: true});
      });
    };

    vm.newFieldModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-field.html',
        controller: 'NewField',
        controllerAs: 'vm',
        resolve : {
          fields : function() {
            return vm.rest.fields;
          },
          type : function() {
            return 'rest';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rest.fields = response;
      });
    };

    vm.editFieldModal = function(field) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/edit-field.html',
        controller: 'EditField',
        controllerAs: 'vm',
        resolve : {
          field : function() {
            return field;
          },
          fields : function() {
            return vm.rest.fields;
          },
          type : function() {
            return 'rest';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rest.fields = response;
      });
    };

    vm.deleteFieldModal = function(field) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-field.html',
        controller: 'DeleteField',
        controllerAs: 'vm',
        resolve : {
          field : function() {
            return field;
          },
          fields : function() {
            return vm.rest.fields;
          },
          type : function() {
            return 'rest';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rest.fields = response;
      });
    };

    vm.addValidatorModal = function(field) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/add-validator.html',
        controller: 'AddValidator',
        controllerAs: 'vm',
        resolve : {
          field : function() {
            return field;
          },
          fields : function() {
            return vm.rest.fields;
          },
          type : function() {
            return 'rest';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rest.fields = response;
      });
    };

    vm.editValidatorModal = function(field, validator) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/edit-validator.html',
        controller: 'EditValidator',
        controllerAs: 'vm',
        resolve : {
          field : function() {
            return field;
          },
          validator : function() {
            return validator;
          },
          fields : function() {
            return vm.rest.fields;
          },
          type : function() {
            return 'rest';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rest.fields = response;
      });
    };

    vm.addFilterModal = function(field) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/add-filter.html',
        controller: 'AddFilter',
        controllerAs: 'vm',
        resolve : {
          field : function() {
            return field;
          },
          fields : function() {
            return vm.rest.fields;
          },
          type : function() {
            return 'rest';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rest.fields = response;
      });
    };

    vm.editFilterModal = function(field, filter) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/edit-filter.html',
        controller: 'EditFilter',
        controllerAs: 'vm',
        resolve : {
          field : function() {
            return field;
          },
          filter : function() {
            return filter;
          },
          fields : function() {
            return vm.rest.fields;
          },
          type : function() {
            return 'rest';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rest.fields = response;
      });
    };
  }
})();
