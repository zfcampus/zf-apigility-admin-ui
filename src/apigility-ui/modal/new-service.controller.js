/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewService', NewService);

  NewService.$inject = [ '$modalInstance', 'Apis' ];

  function NewService($modalInstance, Apis) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.apis = Apis.getApis();

    vm.ok = function() {
      if (!vm.apiname) {
        vm.alert = 'The API name cannot be empty';
        return;
      }
      api.newApi(vm.apiname, function(err, response) {
        if (err) {
          vm.alert = response;
        } else {
          $modalInstance.close(response);
        }
      });
    }
  }
})();
