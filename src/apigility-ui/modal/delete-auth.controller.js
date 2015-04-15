/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteAuth', DeleteAuth);

  DeleteAuth.$inject = [ '$modalInstance', '$stateParams', 'api', 'auth' ];

  function DeleteAuth($modalInstance, $stateParams, api, auth) {
    /* jshint validthis:true */
    var vm = this;
    vm.auth = auth;

    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      vm.loading = true;
      api.deleteAuthenticationAdapter(vm.auth.name, function(err,result){
        vm.loading = false;
        if (err) {
          vm.alert = 'Error during the delete of the Authentication adapter';
          return;
        }
        $modalInstance.close(vm.auth.name);
      });
    }
  }
})();
