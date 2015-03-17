/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.package')
    .controller('Package', Package);

  Package.$inject = ['agApiPath', 'api', '$modal', '$state', '$stateParams', 'SidebarService', 'localStorageService'];

  function Package(agApiPath, api, $modal, $state, $stateParams, SidebarService, localStorageService) {
    /* jshint validthis:true */
    var vm = this;

    vm.formats = [ 'ZIP', 'TAR', 'TGZ', 'ZPK' ];
    vm.apis = SidebarService.getApis();

    if (vm.apis.length == 0) {
      vm.alert = 'In order to create a package file, ready for deployment, you need to create a new API first.';
    }

    vm.package = localStorageService.get('package');
    if (!vm.package) {
      vm.package = {};
      vm.package.format = 'ZIP';
      vm.package.modules = angular.copy(vm.modules);
      vm.package.composer = true;
    }

    vm.buildPackage = function(){
      vm.alert = '';
      if (vm.package.modules.length === 0) {
        vm.alert = 'You need to select at least one API to build the package';
        return;
      }
      vm.loading = true;
      var start = new Date().getTime();
      api.buildPackage(vm.package, vm.apis, function(err, result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
        if (result.token && result.format) {
          var end = new Date().getTime();
          if (vm.package.composer) {
            vm.package.time = (end - start) / 1000;
          }
          localStorageService.set('package', vm.package);
          window.location = agApiPath + '/package?token=' + result.token + '&format=' + result.format;
        }
      });
    };
  }
})();
