/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.package')
    .controller('Package', Package);

  Package.$inject = ['api', '$modal', '$state', '$stateParams', 'SidebarService'];

  function Package(api, $modal, $state, $stateParams, SidebarService) {
    /* jshint validthis:true */
    var vm = this;

    vm.apis = SidebarService.getApis();
    vm.models = [];
    vm.apis.forEach(function(entry){
      vm.models.push(entry.name);
    });
  }
})();
