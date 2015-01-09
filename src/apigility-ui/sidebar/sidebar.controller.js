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
        if (!err) {
          vm.loading = false;
          Apis.setApis(result);
          vm.apis = result;
          getServiceList(result);
        }
      });
    }

    vm.searchApi = function(search) {
      if (!search) {
        vm.apis = Apis.getApis();
        return;
      }
      var newApis = [];
      Apis.getApis().forEach(function(api) {
        var rest = [];
        api.rest.forEach(function(service){
          if (service.toUpperCase()  == search.toUpperCase()) {
            rest.push(service);
          }
        });
        var rpc = [];
        api.rpc.forEach(function(service){
          if (service.toUpperCase()  == search.toUpperCase()) {
            rerpcst.push(service);
          }
        });
        if (rest.length > 0 || rpc.length > 0) {
          api.rest = rest;
          api.rpc = rpc;
          newApis.push(api);
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
        Apis.addRestService(response.api, response.rest);
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
