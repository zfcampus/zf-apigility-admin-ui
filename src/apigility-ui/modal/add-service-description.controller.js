/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('AddServiceDescription', AddServiceDescription);

  AddServiceDescription.$inject = [ '$modalInstance', '$stateParams', 'api', 'service', 'type' ];

  function AddServiceDescription($modalInstance, $stateParams, api, service, type) {
    /* jshint validthis:true */
    var vm = this;
    var apiName = $stateParams.api;
    var version = $stateParams.ver;

    vm.service_name = service.service_name;
    vm.description = '';
    vm.loading = false;
    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      if (!vm.description) {
        vm.alert = 'The option name cannot be empty';
        return;
      }
      vm.loading = true;

      var documentation;
      if (typeof service._embedded !== 'object' || typeof service._embedded.documentation !== 'object') {
        documentation = {description: vm.description};
      } else {
        documentation = angular.copy(service._embedded.documentation);
        documentation.description = vm.description;
      }

      if (type === 'rest') {
        api.saveRestDoc(apiName, version, service.controller_service_name, documentation, refreshModuleDashboard);
      } else if (type === 'rpc') {
        api.saveRpcDoc(apiName, version, service.controller_service_name, documentation, refreshModuleDashboard);
      }
    };

    function refreshModuleDashboard(err, response) {
      vm.loading = false;

      if (err) {
        vm.alert = response;
        return;
      }

      $modalInstance.close({api: apiName, ver: version});
    }
  }
})();
