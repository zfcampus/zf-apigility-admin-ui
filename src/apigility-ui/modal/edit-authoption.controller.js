/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('EditAuthOption', EditAuthOption);

  EditAuthOption.$inject = [ '$modalInstance', '$modal', '$stateParams', 'api', 'auth', 'option' ];

  function EditAuthOption($modalInstance, $modal, $stateParams, api, auth, option) {
    /* jshint validthis:true */
    var vm = this;
    vm.auth = auth;
    vm.option = option;
    vm.value = auth.oauth2_options[option];

    vm.cancel = $modalInstance.dismiss;

    vm.deleteAuthOptionModal = function(auth, option) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-authoption.html',
        controller: 'DeleteAuthOption',
        controllerAs: 'vm',
        resolve : {
          auth : function() {
            return auth;
          },
          option : function() {
            return option;
          }
        }
      });

      modalInstance.result.then(function (response) {
        $modalInstance.close(response);
      });
    }

    vm.ok = function() {
      if (!vm.value) {
        vm.alert = 'The option value cannot be empty';
        return;
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
