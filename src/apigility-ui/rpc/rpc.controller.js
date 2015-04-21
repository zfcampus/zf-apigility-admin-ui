/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.rpc')
    .controller('Rpc', Rpc);

  Rpc.$inject = [ 'api', '$modal', '$stateParams', '$rootScope', 'SidebarService', '$state', '$scope', '$sce', 'documentation'];

  function Rpc(api, $modal, $stateParams, $rootScope, SidebarService, $state, $scope, $sce, documentation) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.rpcName = $stateParams.rpc;
    vm.httpMethods = [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    vm.disabled = !SidebarService.isLastVersion(vm.version, vm.apiName);
    vm.selectorNames = [];

    function initGeneral() {
      vm.tags = {
        accept_whitelist : [],
        content_type_whitelist : []
      };

      api.getRpc(vm.apiName, vm.version, vm.rpcName, function(err, result){
        if (err) {
          vm.alert = 'The RPC service doesn\'t exist. Try to choose a different version!';
          return;
        }
        vm.rpc = result;
        vm.rpc.accept_whitelist.forEach(function(entry){
          vm.tags.accept_whitelist.push({ text : entry });
        });
        vm.rpc.content_type_whitelist.forEach(function(entry){
          vm.tags.content_type_whitelist.push({ text : entry });
        });
        vm.rpc.source_code = [
          { name : 'Controller Class', classname: vm.rpc.controller_class },
          { name : 'Controller Factory', classname: vm.rpc.controller_class + 'Factory' }
        ];
        vm.getSourceCode(vm.rpc.source_code[0].classname);
        vm.source = vm.rpc.source_code[0];

        api.getContentNegotiation(function(result){
          vm.content_negotiation = result;
          for (var property in result) {
            vm.selectorNames.push(result[property].content_name);
          }
        });
      });
    }

    function initAuthorization() {
      api.getAuthorizationRpc(vm.apiName, vm.version, vm.rpcName, function(err, result){
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
      vm.rpc.accept_whitelist = vm.tags.accept_whitelist.map(api.mapTagInput);
      vm.rpc.content_type_whitelist = vm.tags.content_type_whitelist.map(api.mapTagInput);
      api.updateGeneralRpc(vm.apiName, vm.version, vm.rpcName, vm.rpc, function(err, result){
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

    vm.saveAuthorization = function() {
      vm.loading = true;
      api.saveAuthorizationRpc(vm.apiName, vm.version, vm.rpcName, vm.auth, function(err, result){
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
      vm.loading = true;
      api.saveRpcDoc(vm.apiName, vm.version, vm.rpcName, vm.rpc.documentation, function(err,result){
        vm.loading = false;
        if (err) {
          error = true;
          vm.alert = result;
          return;
        }
      });
    };

    vm.resetDocumentation = function() {
      initGeneral();
    };

    vm.deleteRpcModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-rpc.html',
        controller: 'DeleteRpc',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (api, version, service) {
        SidebarService.removeRpcService(api, service);
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
            return vm.rpc.fields;
          },
          type : function() {
            return 'rpc';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rpc.fields = response;
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
            return vm.rpc.fields;
          },
          type : function() {
            return 'rpc';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rpc.fields = response;
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
            return vm.rpc.fields;
          },
          type : function() {
            return 'rpc';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rpc.fields = response;
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
            return vm.rpc.fields;
          },
          type : function() {
            return 'rpc';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rpc.fields = response;
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
            return vm.rpc.fields;
          },
          type : function() {
            return 'rpc';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rpc.fields = response;
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
            return vm.rpc.fields;
          },
          type : function() {
            return 'rpc';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rpc.fields = response;
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
            return vm.rpc.fields;
          },
          type : function() {
            return 'rpc';
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.rpc.fields = response;
      });
    };

    vm.getSourceCode = function(classname) {
      api.getSourceCode(vm.apiName, classname, function(err, response){
        vm.sourcecode = $sce.trustAsHtml(response.source);
        vm.file = response.file;
      });
    };

    vm.generateFromConfiguration = function(method, direction) {
      return documentation.fromConfiguration(
        method,
        direction,
        null,
        vm.rpc.fields,
        vm.tags.accept_whitelist,
        vm.rpc.route_match,
        null
      );
    };
  }
})();
