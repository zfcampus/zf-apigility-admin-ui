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
    vm.search  = '';
    vm.apis = Apis.getApis();

    // Make an API call if the list of APIs is empty
    if (vm.apis.length == 0) {
      api.getApiList(function(err, result){
        if (!err) {
          Apis.setApis(result);
          vm.apis = result;
        }
      });
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
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (selectedItem) {
        
      });
    }
  }
})();
