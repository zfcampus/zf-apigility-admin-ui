/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('EditAuth', EditAuth);

  EditAuth.$inject = [ '$modalInstance', 'api', '$timeout' , 'auth_types', 'auth' ];

  function EditAuth($modalInstance, api, $timeout, auth_types, auth) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.auth_types = auth_types;
    vm.auth = {
      name : auth.name
    };
    switch(auth.type) {
      case 'basic':
        vm.auth.type = 'HTTP Basic';
        vm.auth.basic = auth;
        break;
      case 'digest':
        vm.auth.type = 'HTTP Digest';
        vm.auth.digest = auth;
        break;
      case 'oauth2':
        switch(auth.oauth2_type){
          case 'pdo':
            vm.auth.type = 'OAuth2 PDO';
            vm.auth.pdo = auth;
            break;
          case 'mongo':
            vm.auth.type = 'OAuth2 Mongo';
            vm.auth.mongo = auth;
            break;
        }
    }
    vm.loading = false;

    vm.ok = function() {
      vm.loading = true;
      api.saveAuthenticationAdapter(vm.auth, function(err, response){
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
