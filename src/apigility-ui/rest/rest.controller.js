/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.rest')
    .controller('Rest', Rest);

  Rest.$inject = [ 'api', '$modal', '$stateParams', '$rootScope', 'SidebarService', '$state', '$scope', '$sce', 'documentation'];

  function Rest(api, $modal, $stateParams, $rootScope, SidebarService, $state, $scope, $sce, documentation) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.restName = $stateParams.rest;
    vm.httpMethods = [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    vm.disabled = !SidebarService.isLastVersion(vm.version, vm.apiName);
    vm.selectorNames = [];

    function initGeneral() {
      vm.tags = {
        accept_whitelist : [],
        content_type_whitelist : []
      };

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
        vm.isDoctrine = angular.isDefined(result.object_manager);

        vm.rest.accept_whitelist.forEach(function(entry){
          vm.tags.accept_whitelist.push({ text : entry });
        });
        vm.rest.content_type_whitelist.forEach(function(entry){
          vm.tags.content_type_whitelist.push({ text : entry });
        });

        if (vm.isDoctrine) {
          if (vm.rest.strategies.length === 0) {
            vm.rest.strategies = {};
          }
          api.getRestDoctrineMetadata(result.object_manager, result.entity_class, function(err, response) {
            if (err) {
              console.log(response);
              return;
            }
            vm.doctrineMetadata = response;
          });
        }
        if (vm.rest.hasOwnProperty('table_name') &&
            vm.rest.hasOwnProperty('db')) {
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
        vm.source = vm.rest.source_code[0];

        api.getContentNegotiation(function(result){
          vm.content_negotiation = result;
          for (var property in result) {
            vm.selectorNames.push(result[property].content_name);
          }
        });
      });
    }

    vm.selectHydrator = function($item, $model) {
    };

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

    vm.saveGeneral = function() {
      vm.loading = true;
      if (vm.adapter) {
        vm.rest.adapter_name = vm.adapter.adapter_name;
      }
      if (vm.rest.hydrator_name.name) {
        vm.rest.hydrator_name = vm.rest.hydrator_name.name;
      }
      api.updateGeneralRest(vm.apiName, vm.version, vm.restName, vm.rest, vm.isDoctrine, function(err, result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
      });
    };

    vm.resetGeneral = function() {
      initGeneral();
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
        vm.rest.strategies[response.field] = response.strategy;
      });
    };

    vm.removeStrategy = function(key) {
      delete vm.rest.strategies[key];
    };

    vm.hasProperties = function(obj) {
      for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
          return true;
      }

      return false;
    };

    vm.saveContentNegotiation = function() {
      vm.loading = true;
      vm.rest.accept_whitelist = vm.tags.accept_whitelist.map(api.mapTagInput);
      vm.rest.content_type_whitelist = vm.tags.content_type_whitelist.map(api.mapTagInput);
      api.updateContentNegotiationRest(vm.apiName, vm.version, vm.restName, vm.rest, function(err, result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
      });
    };

    vm.resetContentNegotiation = function() {
      initGeneral();
    };

    vm.saveAuthorization = function() {
      vm.loading = true;
      api.saveAuthorizationRest(vm.apiName, vm.version, vm.restName, vm.auth, function(err, result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
      });
    };

    vm.resetAuthorization = function() {
      initAuthorization();
    };

    vm.saveDocumentation = function() {
      api.saveRestDoc(vm.apiName, vm.version, vm.restName, vm.rest.documentation, function(err,result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
      });
    };

    vm.resetDocumentation = function() {
      initGeneral();
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

    vm.generateFromConfiguration = function(method, direction, restPart) {
      return documentation.fromConfiguration(
        method,
        direction,
        restPart,
        vm.rest.fields,
        vm.tags.accept_whitelist,
        vm.rest.route_match,
        vm.rest.collection_name
      );
    };
  }
})();
