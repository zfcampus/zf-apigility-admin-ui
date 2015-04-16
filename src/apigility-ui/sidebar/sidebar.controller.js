/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility')
    .controller('Sidebar', Sidebar);

  Sidebar.$inject = [ 'api', '$modal', '$rootScope', '$state', 'SidebarService' ];

  function Sidebar(api, $modal, $rootScope, $state, SidebarService){
    /* jshint validthis:true */
    var vm = this;

    vm.apis = SidebarService.getApis();
    vm.getSelected = SidebarService.getSelected;
    vm.setSelected = SidebarService.setSelected;
    vm.changeVersion = SidebarService.setSelectedVersion;
    vm.search = '';

    // Make an API call if the list of APIs is empty
    if (vm.apis.length === 0) {
      vm.loading = true;
      api.getApiList(function(err, result){
        vm.loading = false;
        if (!err) {
          SidebarService.setApis(result);
          vm.apis = result;
          getServiceList(result);
        }
      });
    }

    vm.searchApi = function(search) {
      if (!search) {
        vm.apis = SidebarService.getApis();
        vm.search = '';
        return;
      }
      var newApis = [];
      vm.apis.forEach(function(api) {
        var rest = [];
        api.rest.forEach(function(service){
          if (service.toUpperCase()  == search.toUpperCase()) {
            rest.push(service);
          }
        });
        var rpc = [];
        api.rpc.forEach(function(service){
          if (service.toUpperCase()  == search.toUpperCase()) {
            rpc.push(service);
          }
        });
        if (rest.length > 0 || rpc.length > 0) {
          var copyApi = angular.copy(api);
          copyApi.rest = rest;
          copyApi.rpc = rpc;
          newApis.push(copyApi);
        }
      });
      vm.apis = newApis;
    };

    vm.toggle = function(scope) {
      scope.toggle();
    };

    vm.newApiModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-api.html',
        controller: 'NewApi',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (response) {
        SidebarService.addApi(response);
        vm.setSelected('api' + response.name);
        $state.go('ag.apimodule', {api: response.name, ver: 1});
      });
    };

    vm.newServiceModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-service.html',
        controller: 'NewService',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (response) {
        if (response.hasOwnProperty('rest')) {
          SidebarService.setSelectedVersion(response.api, response.ver);
          $state.go('ag.rest', {api: response.api, ver: response.ver, rest: response.rest});
          SidebarService.addRestService(response.api, response.rest);
          vm.setSelected('api' + response.api + 'rest' + response.rest);
        } else if (response.hasOwnProperty('rpc')) {
          SidebarService.setSelectedVersion(response.api, response.ver);
          $state.go('ag.rpc', {api: response.api, ver: response.ver, rpc: response.rpc});
          SidebarService.addRpcService(response.api, response.rpc);
          vm.setSelected('api' + response.api + 'rpc' + response.rpc);
        } else if (response.hasOwnProperty('rests')) {
          SidebarService.setSelectedVersion(response.api, response.ver);
          response.rests.forEach(function(service) {
            SidebarService.addRestService(response.api, service);
          });
          $state.go('ag.apimodule', {api: response.api, ver: response.ver});
        }
      });
    };

    function getServiceList(apiList) {
      vm.services = [];
      apiList.forEach(function(api){
        api.rest.forEach(function(service){
          vm.services.push(service);
        });
        api.rpc.forEach(function(service){
          vm.services.push(service);
        });
      });
    }
  }
})();
