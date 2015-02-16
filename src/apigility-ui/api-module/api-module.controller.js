/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility')
    .controller('ApiModule', ApiModule);

  ApiModule.$inject = [ 'api', '$modal', '$state', '$stateParams', 'SidebarService' ];

  function ApiModule(api, $modal, $state, $stateParams, SidebarService) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.loading = false;
    vm.setSelected = SidebarService.setSelected;
    vm.getSelected = SidebarService.getSelected;
    vm.disabled = !SidebarService.isLastVersion(vm.version, vm.apiName);

    api.getRestList(vm.apiName, vm.version, function(result){
      vm.rest = result;
    });

    api.getRpcList(vm.apiName, vm.version, function(result){
      vm.rpc = result;
    });

    var apis = SidebarService.getApis();
    for (var i = 0; i < apis.length; i++) {
        if (apis[i].name === vm.apiName) {
          vm.module = apis[i];
          break;
        }
    }

    vm.newVersionModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-version.html',
        controller: 'NewVersion',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function(response) {
        if (response.hasOwnProperty('version')) {
          SidebarService.setApis([]);
          $state.go('ag', null, {reload: true});
        }
      });
    };

    vm.deleteApiModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-api.html',
        controller: 'DeleteApi',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function(apiName) {
        SidebarService.removeApi(apiName);
        $state.go('ag', null, {reload: true});
      });
    };

    vm.newServiceModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-service.html',
        controller: 'NewService',
        controllerAs: 'vm',
        resolve: {
          apiname : function() {
            return vm.apiName;
          },
          version: function() {
            return vm.version;
          }
        }
      });

      modalInstance.result.then(function (response) {
        SidebarService.addRestService(response.api, response.rest);
      });
    };

    vm.setDefaultVersion = function() {
      vm.loading = true;
      api.setDefaultVersion(vm.apiName, vm.module.default_version, function(err, response){
        vm.loading = false;
        if (err) {
          vm.alert = response;
          return;
        }
      })
    };
  }
})();
