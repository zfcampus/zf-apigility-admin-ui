/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('AddAuthOption', AddAuthOption);

  AddAuthOption.$inject = [ '$modalInstance', '$stateParams', 'api', 'auth' ];

  function AddAuthOption($modalInstance, $stateParams, api, auth) {
    /* jshint validthis:true */
    var vm = this;
    vm.auth = auth;

    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      if (!vm.option) {
        vm.alert = 'The option name cannot be empty';
        return;
      }
      if (!vm.value) {
        vm.alert = 'The option value cannot be empty';
        return;
      }
      if (auth.hasOwnProperty('oauth2_options') && auth.oauth2_options !== null) {
        if (auth.oauth2_options.hasOwnProperty(vm.option)) {
          vm.alert = 'The option already exists';
          return;
        }
      } else {
        auth.oauth2_options = {};
      }
      vm.loading = true;
      var newAuth = angular.copy(auth);
      newAuth.oauth2_options[vm.option] = vm.value;
      api.saveOptionsAuthenticationAdapter(newAuth, function(err, response){
        vm.loading = false;
        if (err) {
          vm.alert = response;
          return;
        }
        $modalInstance.close(response);
      });
    }
  }
})();
