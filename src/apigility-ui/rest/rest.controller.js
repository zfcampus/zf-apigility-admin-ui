/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.rest')
    .controller('Rest', Rest);

  Rest.$inject = [ 'api', '$modal', '$stateParams', '$rootScope', 'Apis', '$state'];

  function Rest(api, $modal, $stateParams, $rootScope, Apis, $state) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.restName = $stateParams.rest;
    vm.httpMethods = [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    api.getHydrators(function(result){
      vm.hydrators = result;
    });

    api.getRest(vm.apiName, vm.version, vm.restName, function(result){
      vm.rest = result;
      vm.rest.fields = [];
      var i = 0;
      if (result._embedded) {
        while (typeof result._embedded.input_filters[0][i] !== 'undefined') {
          vm.rest.fields[i] = result._embedded.input_filters[0][i];
          i++;
        }
      }
    });

    api.getContentNegotiation(function(result){
      vm.content_negotiation = result.selectors;
    });

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
        templateUrl: 'apigility-ui/rest/new-field.modal.html',
        controller: 'NewFieldModal',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.editFieldModal = function(fieldName) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/rest/edit-field.modal.html',
        controller: 'EditFieldModal',
        controllerAs: 'vm',
        resolve : {
          fieldName : function() {
            return fieldName;
          },
          vmParent : function() {
            return vm;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.deleteFieldModal = function(fieldName) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/rest/delete-field.modal.html',
        controller: 'DeleteFieldModal',
        controllerAs: 'vm',
        resolve : {
          fieldName : function() {
            return fieldName;
          },
          vmParent : function() {
            return vm;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.addValidatorModal = function(fieldName) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/rest/add-validator.modal.html',
        controller: 'AddValidatorModal',
        controllerAs: 'vm',
        resolve : {
          fieldName : function() {
            return fieldName;
          },
          vmParent : function() {
            return vm;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.editValidatorModal = function(validatorName) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/rest/edit-validator.modal.html',
        controller: 'EditValidatorModal',
        controllerAs: 'vm',
        resolve : {
          validatorName : function() {
            return validatorName;
          },
          vmParent : function() {
            return vm;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.addFilterModal = function(fieldName) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/rest/add-filter.modal.html',
        controller: 'AddFilterModal',
        controllerAs: 'vm',
        resolve : {
          fieldName : function() {
            return fieldName;
          },
          vmParent : function() {
            return vm;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.editFilterModal = function(filterName) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/rest/edit-filter.modal.html',
        controller: 'EditFilterModal',
        controllerAs: 'vm',
        resolve : {
          filterName : function() {
            return filterName;
          },
          vmParent : function() {
            return vm;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
})();
