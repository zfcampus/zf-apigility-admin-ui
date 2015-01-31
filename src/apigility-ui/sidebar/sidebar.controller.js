/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility')
    .controller('Sidebar', Sidebar);

  Sidebar.$inject = [ 'api', '$modal', '$rootScope', '$state', 'Apis' ];

  function Sidebar(api, $modal, $rootScope, $state, Apis){
    /* jshint validthis:true */
    var vm = this;

    vm.version = 1;
    vm.services = [];
    vm.apis = Apis.getApis();

    // Make an API call if the list of APIs is empty
    if (vm.apis.length == 0) {
      vm.loading = true;
      api.getApiList(function(err, result){
        vm.loading = false;
        if (!err) {
          Apis.setApis(result);
          vm.apis = result;
          getServiceList(result);
        }
      });
    }

    vm.searchApi = function(search) {
      if (!search) {
        vm.apis = Apis.getApis();
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
    }

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
        Apis.addApi(response);
      });
    }

    vm.newServiceModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-service.html',
        controller: 'NewService',
        controllerAs: 'vm',
        resolve : {
          apiname : function() {
            return vm.apiname;
          }
        }
      });

      modalInstance.result.then(function (response) {
        if (response.hasOwnProperty('rest')) {
          Apis.addRestService(response.api, response.rest);
        } else if (response.hasOwnProperty('rpc')) {
          Apis.addRpcService(response.api, response.rpc);
        }
      });
    }

    function getServiceList(apiList) {
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
