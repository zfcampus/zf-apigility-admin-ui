/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewApi', NewApi);

  NewApi.$inject = [ '$modalInstance', 'api', '$timeout' ];

  function NewApi($modalInstance, api, $timeout) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel  = $modalInstance.dismiss;
    vm.apiname = '';
    vm.loading = false;

    vm.ok = function() {
      if (!vm.apiname) {
        vm.alert = 'The API name cannot be empty';
        return;
      }
      vm.loading = true;
      api.newApi(vm.apiname, function(err, response) {
        if (err) {
          vm.alert = response;
          vm.loading = false;
          return;
        }
        $timeout(function(){
          vm.loading = false;
          $modalInstance.close(response);
        }, 3000);
      });
    }
  }
})();
