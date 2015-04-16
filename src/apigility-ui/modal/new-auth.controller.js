/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewAuth', NewAuth);

  NewAuth.$inject = [ '$modalInstance', 'api', '$timeout' , 'auth_types' ];

  function NewAuth($modalInstance, api, $timeout, auth_types) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel  = $modalInstance.dismiss;
    vm.auth_types = auth_types;
    vm.auth = {
      basic  : {},
      digest : {},
      oauth2 : {
        pdo   : {},
        mongo : {}
      }
    };
    vm.auth.type = auth_types[0];
    vm.loading = false;

    vm.ok = function() {
      if (!vm.auth.name) {
        vm.alert = 'The Adapter name cannot be empty';
        return;
      }
      if (vm.auth.name.toLowerCase() === 'none') {
        vm.alert = 'The Adapter name cannot be "' + vm.auth.name + '"';
        return;
      }
      if (vm.auth.name.endsWith('-basic') || vm.auth.name.endsWith('-digest')) {
        vm.alert = 'The Adapter name cannot have -basic or -digest as suffix';
        return;
      }
      vm.loading = true;
      api.addAuthenticationAdapter(vm.auth, function(err, response){
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
