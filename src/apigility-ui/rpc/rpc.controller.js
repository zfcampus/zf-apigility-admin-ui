/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.rpc')
    .controller('Rpc', Rpc);

  Rpc.$inject = [ 'api', '$modal', '$stateParams', '$rootScope', 'SidebarService', '$state', '$scope', '$sce'];

  function Rpc(api, $modal, $stateParams, $rootScope, SidebarService, $state, $scope, $sce) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.rpcName = $stateParams.rpc;
    vm.httpMethods = [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    vm.changed = [false, false, false, false];
    vm.tags = {
      accept_whitelist : [],
      content_type_whitelist : []
    };
    vm.disabled = !SidebarService.isLastVersion(vm.version, vm.apiName);

    function initGeneral() {
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
      });

      if (vm.hasOwnProperty('rpc')) {
        api.getContentNegotiation(function(result){
          vm.content_negotiation = result;
          for (var i = 0; i < result.length; i++) {
            if (vm.rpc.selector === result[i].content_name) {
              vm.rpc.selector = result[i];
              break;
            }
          }
        });
      }
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

    vm.change = function(tab) {
      vm.changed[parseInt(tab)] = true;
    }

    vm.saveGeneral = function() {
      if (!vm.changed[0]) {
        return;
      }
      vm.loading = true;
      vm.rpc.accept_whitelist = vm.tags.accept_whitelist.map(api.mapTagInput);
      vm.rpc.content_type_whitelist = vm.tags.content_type_whitelist.map(api.mapTagInput);
      api.updateGeneralRpc(vm.apiName, vm.version, vm.rpcName, vm.rpc, function(err, result){
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

    vm.saveAuthorization = function() {
      if (!vm.changed[1]) {
        return;
      }
      vm.loading = true;
      api.saveAuthorizationRpc(vm.apiName, vm.version, vm.rpcName, vm.auth, function(err, result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
        vm.changed[1] = false;
      });
    };

    vm.resetAuthorization = function() {
      if (vm.changed[1]) {
        initAuthorization();
        vm.changed[1] = false;
      }
    };

    vm.saveDocumentation = function() {
      if (!vm.changed[2]) {
        return;
      }
      api.saveRpcDoc(vm.apiName, vm.version, vm.rpcName, vm.rpc.documentation, function(err,result){
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
      if (vm.changed[2]) {
        initGeneral();
        vm.changed[2] = false;
      }
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
  }
})();
