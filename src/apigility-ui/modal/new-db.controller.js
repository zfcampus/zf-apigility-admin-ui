/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewDb', NewDb);

  NewDb.$inject = [ '$modalInstance', 'api', '$timeout' , 'driver_types' ];

  function NewDb($modalInstance, api, $timeout, driver_types) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel  = $modalInstance.dismiss;
    vm.driver_types = driver_types;
    vm.db = {};
    vm.db.driver = driver_types[0];
    vm.loading = false;

    vm.ok = function() {
      if (!vm.db.adapter_name) {
        vm.alert = 'The Adapter name cannot be empty';
        return;
      }
      if (!vm.db.database) {
        vm.alert = 'The Database name cannot be empty';
        return;
      }
      vm.loading = true;
      api.addDatabase(vm.db, function(err, response){
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
