/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewVersion', NewVersion);

  NewVersion.$inject = [ '$modalInstance', '$stateParams', 'api' ];

  function NewVersion($modalInstance, $stateParams, api) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.newVersion = parseInt($stateParams.ver) + 1;
    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      vm.loading = true;
      api.newVersion(vm.apiName, function(err, response){
        vm.loading = false;
        if (err) {
          vm.alert = response;
          return
        }
        $modalInstance.close(response);
      });
    };
  }
})();
