/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.documentation')
    .controller('Documentation', Documentation);

    Documentation.$inject = ['api', '$modal', '$state', '$stateParams'];

  function Documentation(api, $modal, $state, $stateParams) {
    /* jshint validthis:true */
    var vm = this;
    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;

    if (!vm.apiName) {
      api.getApiDocumentList(function(err,response){
        vm.doc = response;
      });
    } else {
      api.getApiDocument(vm.apiName, vm.version, function(err,response){
        response.services.forEach(function(service){
          service.route_collection = service.route.replace(/\[.*?\]/g,'');
        });
        vm.doc = response;
      });
    }

  }
})();
