/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.rest')
    .controller('Rest', Rest);

  Rest.$inject = [ 'api', '$modal', '$stateParams', '$rootScope', 'SidebarService', '$state', '$scope', '$sce'];

  function Rest(api, $modal, $stateParams, $rootScope, SidebarService, $state, $scope, $sce) {
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
    vm.disabled = !SidebarService.isLastVersion(vm.version, vm.apiName);

    function initGeneral() {
      api.getHydrators(function(result){
        vm.hydrators = result;
      });

      api.getDatabase(function(err, response){
        vm.db = response;
      });

      api.getDoctrineAdapters(function(err, response) {
        vm.doctrine = response.doctrine_adapter;
      });

      api.getRest(vm.apiName, vm.version, vm.restName, function(result){
        vm.rest = result;
        vm.isDoctrine = result.object_manager !== undefined;

        vm.rest.accept_whitelist.forEach(function(entry){
          vm.tags.accept_whitelist.push({ text : entry });
        });
        vm.rest.content_type_whitelist.forEach(function(entry){
          vm.tags.content_type_whitelist.push({ text : entry });
        });

        if (vm.isDoctrine) {
          api.getRestDoctrineMetadata(result.object_manager, result.entity_class, function(err, response) {
            if (err) {
              console.log(response);
              return;
            }
            vm.doctrineMetadata = response;
          });
        }
        if (vm.rest.hasOwnProperty('table_name')) {
          for (var i = 0; i < vm.db.db_adapter.length; i++) {
            if (vm.db.db_adapter[i].adapter_name == vm.rest.adapter_name) {
              vm.adapter = vm.db.db_adapter[i];
              break;
            }
          }
        }
        vm.rest.source_code = [
          { name : 'Collection Class', classname: vm.rest.collection_class },
          { name : 'Entity Class', classname: vm.rest.entity_class },
        ];
        if (vm.rest.resource_class) {
          vm.rest.source_code.push(
            { name : 'Resource Class', classname: vm.rest.resource_class },
            { name : 'Resource Factory', classname: vm.rest.resource_class + 'Factory' }
          );
        }
        vm.getSourceCode(vm.rest.source_code[0].classname);
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
      console.log('Changed 0', vm.changed[0]);
      console.log('Changed 1', vm.changed[1]);
      if (!vm.changed[0] && !vm.changed[1]) {
        return;
      }
      vm.loading = true;
      if (vm.adapter) {
        vm.rest.adapter_name = vm.adapter.adapter_name;
      }
      api.updateGeneralRest(vm.apiName, vm.version, vm.restName, vm.rest, vm.isDoctrine, function(err, result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
        vm.changed[0] = false;
      });
    };

    vm.resetGeneral = function() {
      if (vm.changed[0] || vm.changed[1]) {
        initGeneral();
        vm.changed[0] = false;
        vm.changed[1] = false;
      }
    };

    vm.newDoctrineStrategyModal = function () {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-doctrinestrategy.html',
        controller: 'NewDoctrineStrategy',
        controllerAs: 'vm',
        resolve : {
          fields : function() {
            return vm.doctrineMetadata.fieldNames;
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.changed[1] = true;
        vm.rest.strategies[response.field] = response.strategy;
      });
    };

    vm.removeStrategy = function(key) {
      delete vm.rest.strategies[key];
      vm.changed[1] = true;
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
        vm.changed[2] = false;
      });
    };

    vm.resetContentNegotiation = function() {
      if (vm.changed[1]) {
        initGeneral();
        vm.changed[2] = false;
      }
    };

    vm.saveAuthorization = function() {
      if (!vm.changed[3]) {
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
      if (vm.changed[3]) {
        initAuthorization();
        vm.changed[3] = false;
      }
    };

    vm.saveDocumentation = function() {
      if (!vm.changed[4]) {
        return;
      }
      api.saveRestDoc(vm.apiName, vm.version, vm.restName, vm.rest.documentation, function(err,result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
        vm.changed = false;
      });
    };

    vm.resetDocumentation = function() {
      if (vm.changed[4]) {
        initGeneral();
        vm.changed[4] = false;
      }
    };

    vm.deleteRestModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-rest.html',
        controller: 'DeleteRest',
        controllerAs: 'vm',
        resolve: {
          isDoctrine: function() {
            return vm.rest.object_manager !== undefined;
          }
        }
      });

      modalInstance.result.then(function (response) {
        SidebarService.removeRestService(response.api, response.service);
        $state.go('ag.apimodule', {api: response.api, ver: response.version}, {reload: true});
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

    vm.getSourceCode = function(classname) {
      api.getSourceCode(vm.apiName, classname, function(err, response){
        vm.sourcecode = $sce.trustAsHtml(response.source);
        vm.file = response.file;
      });
    };
  }
})();
