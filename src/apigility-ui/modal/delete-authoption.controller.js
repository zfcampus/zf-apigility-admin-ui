/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteAuthOption', DeleteAuthOption);

  DeleteAuthOption.$inject = [ '$modalInstance', '$stateParams', 'api', 'auth', 'option' ];

  function DeleteAuthOption($modalInstance, $stateParams, api, auth, option) {
    /* jshint validthis:true */
    var vm = this;
    vm.option = option;
    vm.auth = auth;
    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      vm.loading = true;
      var newAuth = angular.copy(auth);
      delete newAuth.oauth2_options[option];
      if (Object.keys(newAuth.oauth2_options).length === 0) {
        newAuth.oauth2_options = null;
      }
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
